#!/usr/bin/env node
const containerInfo = require('../lib/container.info');
const { prototypeScriptPath, typeInfoFilePath, containerFilePath, isContextSingleton, scriptOutputDirPath } = require('./map.arguments');
containerInfo.add({ prototypeScriptPath, containerFilePath, isContextSingleton, containerInfoOutputDirPath: scriptOutputDirPath });
containerInfo.resolve({ prototypeScriptPath, typeInfoFilePath, containerInfoOutputDirPath: scriptOutputDirPath });
