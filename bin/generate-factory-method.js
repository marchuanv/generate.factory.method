#!/usr/bin/env node
const path = require('path');
const typeInfo = require('../lib/type.info');
const factoryContainer = require('../lib/factory.container');
const { existsSync } = require('fs');
const { readdirSync, writeFileSync, statSync, readFileSync } = require('fs');
const factoryTemplate = readFileSync(path.join(__dirname, '../lib', 'templates', 'factory.template'),'utf8');

function walk(dir) {
    let results = [];
    const list = readdirSync(dir);
    list.forEach(function(file) {
        const _file = path.join(dir, '/', file);
        const stat = statSync(_file);
        if (stat && stat.isDirectory()) { 
            /* Recurse into a subdirectory */
            results = results.concat(walk(_file));
        } else { 
            /* Is a file */
            results.push(_file);
        }
    });
    return results;
}

const { command, scriptPath, prototypeScriptPath, isSingleton, isContextSingleton, scriptOutputDirPath, contextName, defaultContextName } = require('./map.arguments');
if (command === 'add-type-info') {
   return require('./add-type-info');
}

if (!existsSync(scriptPath)) {
    throw new Error(`${scriptPath} script does not exist.`);
}
if (!existsSync(prototypeScriptPath)) {
    throw new Error(`${prototypeScriptPath} script does not exist.`);
}
if (!existsSync(scriptOutputDirPath)){
    throw new Error(`${scriptOutputDirPath} script does not exist.`);
}

const script = require(prototypeScriptPath);
const typeName = Object.keys(script)[0];

typeInfo.add({ scriptPath, prototypeScriptPath, isSingleton, isContextSingleton, typeInfoOutputDirPath: scriptOutputDirPath });
typeInfo.resolve({ prototypeScriptPath, typeInfoOutputDirPath: scriptOutputDirPath });

const info = typeInfo.get({ typeInfoOutputDirPath: scriptOutputDirPath, typeName });

const ctorArgumentNames = info.childInfoArray.map(ci => ci.variableName);
const ctorArgumentsWithContextNames = ctorArgumentNames.concat(['contextName']);
for(const ctorArgumentName of ctorArgumentNames) {
    {
        const scriptPath = path.join(path.dirname(scriptOutputDirPath), `${ctorArgumentName.toLowerCase()}.js`);
        const prototypeScriptPath = path.join(path.dirname(scriptOutputDirPath), `${ctorArgumentName.toLowerCase()}.prototype.js`);
        if (existsSync(scriptPath) &&existsSync(prototypeScriptPath)) {
            typeInfo.add({ scriptPath, prototypeScriptPath, isSingleton, isContextSingleton, typeInfoOutputDirPath: scriptOutputDirPath });
            typeInfo.resolve({ prototypeScriptPath, typeInfoOutputDirPath: scriptOutputDirPath });
        }
    }
};

typeInfo.resolve({ prototypeScriptPath, typeInfoOutputDirPath: scriptOutputDirPath });

// factoryContainer.generate({ 
//     typeInfo: info,
//     scriptPath,
//     isContextSingleton,
//     contextName,
//     defaultContextName,
//     jsonOutputDirPath: scriptOutputDirPath
// });

// const factoryScriptPath = path.join(scriptOutputDirPath, `${info.typeName.toLowerCase()}.factory.js`);
// const containerFilePaths = walk(scriptOutputDirPath).filter(p => p.indexOf(info.typeName.toLowerCase()) > -1 ).map(p => p.replace(/\\/g,'//'));
// const factoryJs = factoryTemplate
//     .replace(/\[ContextFilePaths\]/g, JSON.stringify(containerFilePaths))
//     .replace(/\[TypeName\]/g, info.typeName)
//     .replace(/\[PrimitiveArgs\]/g, ctorArgumentNames.join(','))
//     .replace(/\[PrimitiveArgsWithContextName\]/g, ctorArgumentsWithContextNames.join(','));
// writeFileSync(factoryScriptPath, factoryJs, 'utf8');
