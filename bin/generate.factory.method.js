#!/usr/bin/env node
const path = require('path');
const typeInfo = require('../lib/type.info');
const factoryContainer = require('../lib/factory.container');
const { existsSync } = require('fs');

const args = {
    scriptPath: null,
    prototypeScriptPath: null,
    isSingleton: null,
    isContextSingleton: null,
    scriptOutputDirPath: null,
    contextName: null,
    defaultContextName: null
}

process.argv.forEach( (param, index) => {
    const name = param.replace('--','');
    if (args[name] !== undefined) {
        let value = process.argv[index + 1];
        if (value.toLowerCase().indexOf('true') > -1) {
            value = true;
        } else if (value.toLowerCase().indexOf('false') > -1) {
            value = false;
        }
        if (typeof value === 'string' && (value.indexOf('/') > -1 || value.indexOf('\\') > -1 ) ) {
            value = path.resolve(value);
        }
        args[name] = value;
    }
});

const { scriptPath, prototypeScriptPath, isSingleton, isContextSingleton, scriptOutputDirPath, contextName, defaultContextName } = args;

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


typeInfo.add({ type, isSingleton });
const _typeInfo = typeInfo.get({ typeName: type.name });

const ctorArgumentsWithContextNames = _typeInfo.childInfoArray.map(ci => ci.variableName);
const ctorArgumentNames = ctorArgumentsWithContextNames.filter(arg => arg.toLowerCase().indexOf('contextname') === -1);

const container = factoryContainer.generate({ 
    typeInfo: _typeInfo,
    scriptPath,
    isContextSingleton,
    contextName,
    defaultContextName,
    jsonOutputDirPath: scriptOutputDirPath
});
const { containerContextFilePaths } = container;

const factoryJs = factoryTemplate
    .replace(/\[ContainerContextFilePaths\]/g, containerContextFilePaths)
    .replace(/\[TypeName\]/g, _typeInfo.typeName)
    .replace(/\[PrimitiveArgs\]/g, ctorArgumentNames.join(','))
    .replace(/\[PrimitiveArgsWithContextName\]/g, ctorArgumentsWithContextNames.join(','));
writeFileSync(scriptOutputDirPath, factoryJs, 'utf8');