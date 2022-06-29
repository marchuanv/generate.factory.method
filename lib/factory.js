const cache = [];
const { readdirSync, readFileSync  } = require('fs');
const path = require('path');
const utils = require('utils');
const { writeFileSync } = require('fs');
const dir = readdirSync(path.join(__dirname), { withFileTypes: true }).filter(dirent => dirent.isFile()).map(file => path.join(__dirname, file.name));
const httpDir = readdirSync(path.join(__dirname,'http'), { withFileTypes: true }).filter(dirent => dirent.isFile()).map(file => path.join(__dirname, 'http', file.name));
const websocketDir = readdirSync(path.join(__dirname, 'websocket'), { withFileTypes: true }).filter(dirent => dirent.isFile()).map(file => path.join(__dirname, 'websocket', file.name));
const scripts = dir.concat(httpDir.concat(websocketDir));

const constructors = [];
for(const script of scripts) {
    const expectedClassName = path.basename(script).replace(path.extname(script),"");
    const scriptText = readFileSync(script, 'utf8');
    let ctor = "";
    let found = false;
    const scriptTextArray = [];
    for(let i = 0; i < scriptText.length; i++) {
        if (scriptText[i] !== ' ') {
            scriptTextArray.push(scriptText[i].toLowerCase());
        }
    }
    const index = scriptTextArray.reduce((previousValue, currentValue, currentIndex, array) => {
        if (previousValue.replace('',' ').indexOf(expectedClassName.toLowerCase()) > -1) {
            if (currentValue === '(') {
                return `${expectedClassName}(`;
            } else if (currentValue === ')') {
                return `${expectedClassName}(${previousValue})`;
            } else {
                return '';
            }
        }
        return previousValue = previousValue + currentValue;
    });
    for(let i = 0; i < scriptText.length; i++) {
        let c = scriptText[i];
        ctor = ctor + c;
        if (ctor.toLowerCase() === expectedClassName.toLowerCase()) {
            for(i++; i < scriptText.length;) {
                c = scriptText[i];
                ctor = ctor + c;
                if (c === ')') {
                    found = true;
                    break;
                }
            }
            if (found) {
                constructors.push({ file: script, ctor });
                break;
            }
        }
    }
}
const factoryDef = path.join(__dirname, '../', 'factory.json');
writeFileSync(factoryDef, utils.getJSONString(constructors));

Object.defineProperty(module.exports, 'get', { writable: false, value: ({ typeName,  }) => {
    if (!typeName) {
        throw new Error("the 'typeName' argument is null or undefined");
    }
    const _typeNameToLower = typeName.toLowerCase();
    const found = cache.find(item => item.type === _typeNameToLower);
    if (found) {
        return found;
    } else {
        const foundScript = scripts.find(script => script.endsWith(`${_typeNameToLower}.js`));
        const required = require(foundScript);
        const type = required[typeName];
        const parameters = utils.getFunctionParams(type);
        const ctor = type.prototype.constructor;
        instance.isOpen();
        cache.push();
    }
}});
