const { readdirSync, readFileSync  } = require('fs');
const path = require('path');
const utils = require('utils');
const { writeFileSync } = require('fs');
const dir = readdirSync(path.join(__dirname, 'lib'), { withFileTypes: true }).filter(dirent => dirent.isFile()).map(file => path.join(__dirname, 'lib', file.name));
const httpDir = readdirSync(path.join(__dirname, 'lib', 'http'), { withFileTypes: true }).filter(dirent => dirent.isFile()).map(file => path.join(__dirname, 'lib', 'http', file.name));
const websocketDir = readdirSync(path.join(__dirname, 'lib', 'websocket'), { withFileTypes: true }).filter(dirent => dirent.isFile()).map(file => path.join(__dirname, 'lib', 'websocket', file.name));
const scripts = dir.concat(httpDir.concat(websocketDir));
const factoryConfigPath = path.join(__dirname, 'factory.json');

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
            const index = previousValue.toLowerCase().replace('',' ').indexOf(`function${expectedClassName.toLowerCase()}(`);
            count = index > -1 ? (count + 1): count;
            if (count === 1) {
                count = 0;
                step = 2;
                return `${array.slice(index + 7, arrayIndex).join("")}${currentValue}`;
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
        const ctorArray = ctor.split('(');
        const name = ctorArray[0];
        let deconstruct = false;
        let parameters = ctorArray[1];
        parameters = parameters.replace('{','').replace('}','').replace(')','').split(',').filter(p => p);
        if (ctorArray[1].startsWith('{')) {
            deconstruct = true;
        }
        const scriptPath = script.replace(/\\/g,'[backslash]')
        factoryInfo.push({ name, script: scriptPath, parameters, deconstruct });
    }
}
let factoryConfigString = utils.getJSONString(factoryInfo);
factoryConfigString = factoryConfigString.replace(/\[backslash\]/g,'\\\\')
writeFileSync(factoryConfigPath, factoryConfigString,'utf8');
