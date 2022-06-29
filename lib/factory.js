const cache = [];
const { readdirSync, readFileSync  } = require('fs');
const path = require('path');
const utils = require('utils');
const { writeFileSync } = require('fs');
const dir = readdirSync(path.join(__dirname), { withFileTypes: true }).filter(dirent => dirent.isFile()).map(file => path.join(__dirname, file.name));
const httpDir = readdirSync(path.join(__dirname,'http'), { withFileTypes: true }).filter(dirent => dirent.isFile()).map(file => path.join(__dirname, 'http', file.name));
const websocketDir = readdirSync(path.join(__dirname, 'websocket'), { withFileTypes: true }).filter(dirent => dirent.isFile()).map(file => path.join(__dirname, 'websocket', file.name));
const scripts = dir.concat(httpDir.concat(websocketDir));

const factoryInfo = [];
for(const script of scripts) {
    const expectedClassName = path.basename(script).replace(path.extname(script),"");
    const scriptText = readFileSync(script, 'utf8');
    const scriptTextArray = [];
    for(let i = 0; i < scriptText.length; i++) {
        if (scriptText[i] !== ' ') {
            scriptTextArray.push(scriptText[i]);
        }
    }
    let step = 1;
    let count = 0;
    const ctor = scriptTextArray.reduce((previousValue, currentValue, arrayIndex, array) => {
        if (step === 1) {
            const index = previousValue.toLowerCase().replace('',' ').indexOf(expectedClassName.toLowerCase());
            count = index > -1 ? (count + 1): count;
            if (count === 1 && currentValue === '(') {
                count = 0;
                step = 2;
                const className = array.slice(index-1, arrayIndex).join("");
                return `${className}(`;
            } else {
                return previousValue + currentValue;
            }
        } else if (step === 2) {
            if (currentValue === ')') {
                step = 3;
                return `${previousValue})`;
            } else {
                return previousValue + currentValue;
            }
        } else {
            return previousValue;
        }
    });
    if (step === 3) {
        const name = ctor.split('(')[0];
        let parameters = ctor.split('(')[1];
        parameters = parameters.replace('{','').replace('}','').replace(')','').split(',').filter(p => p)
        factoryInfo.push({ name, parameters });
    }
}
const factoryDef = path.join(__dirname, '../', 'factory.json');
writeFileSync(factoryDef, utils.getJSONString(factoryInfo));

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
