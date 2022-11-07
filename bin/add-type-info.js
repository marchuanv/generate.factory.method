#!/usr/bin/env node
const typeInfo = require('../lib/type.info');
const { scriptPath, prototypeScriptPath, isContextSingleton, isSingleton, scriptOutputDirPath } = require('./map.arguments');
typeInfo.add({ scriptPath, prototypeScriptPath, isSingleton, isContextSingleton, typeInfoOutputDirPath: scriptOutputDirPath });
typeInfo.resolve({ prototypeScriptPath, typeInfoOutputDirPath: scriptOutputDirPath });
