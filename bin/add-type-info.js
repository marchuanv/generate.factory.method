#!/usr/bin/env node
const typeInfo = require('../lib/type.info');
const { existsSync } = require('fs');
const { scriptPath, prototypeScriptPath, isContextSingleton, isSingleton, scriptOutputDirPath } = require('./map.arguments');

if (!existsSync(scriptPath)) {
    throw new Error(`${scriptPath} script does not exist.`);
}
if (!existsSync(prototypeScriptPath)) {
    throw new Error(`${prototypeScriptPath} script does not exist.`);
}
if (!existsSync(scriptOutputDirPath)) {
    throw new Error(`${scriptOutputDirPath} script does not exist.`);
}

typeInfo.add({ scriptPath, prototypeScriptPath, isSingleton, isContextSingleton, typeInfoOutputDirPath: scriptOutputDirPath });
typeInfo.resolve({ prototypeScriptPath, typeInfoOutputDirPath: scriptOutputDirPath });
