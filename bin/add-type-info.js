#!/usr/bin/env node
const typeInfo = require('../lib/type.info');
const { existsSync } = require('fs');
const { prototypeScriptPath, isSingleton, isContextSingleton, scriptOutputDirPath } = require('./map.arguments');

if (!existsSync(prototypeScriptPath)) {
    throw new Error(`${prototypeScriptPath} script does not exist.`);
}
if (!existsSync(scriptOutputDirPath)) {
    throw new Error(`${scriptOutputDirPath} script does not exist.`);
}

typeInfo.add({ prototypeScriptPath, isSingleton, isContextSingleton, typeInfoOutputDirPath: scriptOutputDirPath });
typeInfo.resolve({ prototypeScriptPath, typeInfoOutputDirPath: scriptOutputDirPath });
