#!/usr/bin/env node
const typeInfo = require('../lib/type.info');
const factoryContainer = require('../lib/factory.container');

const type = process.argv[2];
const scriptPath = process.argv[3];
const isSingleton = process.argv[5];
const isContextSingleton = process.argv[6];
const scriptOutputDirPath = process.argv[7];
const contextName = process.argv[8];
const defaultContextName = process.argv[9];

if (!existsSync(scriptOutputDirPath)){
    throw new Error(`${scriptOutputDirPath} does not exist.`);
}

typeInfo.add({ type, isSingleton });
const _typeInfo = typeinfo.get({ typeName: type.name });

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