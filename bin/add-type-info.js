#!/usr/bin/env node
const typeInfo = require('../lib/type.info');
const { scriptPath, prototypeScriptPath, isSingleton, scriptsDirPath, scriptsOutputDirPath } = require('./map.arguments');
typeInfo.register({ scriptPath, prototypeScriptPath, isSingleton, typeInfoDirPath: scriptsDirPath, typeInfoOutputDirPath: scriptsOutputDirPath });
