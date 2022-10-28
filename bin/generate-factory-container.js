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

const script = require(scriptPath);
const key = Object.keys(script)[0];
const type = script[key];

typeInfo.add({ type, isSingleton, typeInfoOutputDirPath:  scriptOutputDirPath });
const _typeInfo = typeInfo.get({ type, typeInfoOutputDirPath: scriptOutputDirPath });

const ctorArgumentsWithContextNames = _typeInfo.childInfoArray.map(ci => ci.variableName);
ctorArgumentNames = ctorArgumentsWithContextNames.concat(['contextName']);

factoryContainer.generate({ 
    typeInfo: _typeInfo,
    scriptPath,
    isContextSingleton,
    contextName,
    defaultContextName,
    jsonOutputDirPath: scriptOutputDirPath
});

const factoryScriptPath = path.join(scriptOutputDirPath, `${_typeInfo.typeName.toLowerCase()}.factory.js`);
const containerFilePaths = walk(scriptOutputDirPath).filter(p => p.indexOf(_typeInfo.typeName.toLowerCase()) > -1 ).map(p => p.replace(/\\/g,'//'));
const factoryJs = factoryTemplate
    .replace(/\[ContextFilePaths\]/g, JSON.stringify(containerFilePaths))
    .replace(/\[TypeName\]/g, _typeInfo.typeName)
    .replace(/\[PrimitiveArgs\]/g, ctorArgumentNames.join(','))
    .replace(/\[PrimitiveArgsWithContextName\]/g, ctorArgumentsWithContextNames.join(','));
writeFileSync(factoryScriptPath, factoryJs, 'utf8');
