#!/usr/bin/env node
const containerInfo = require('../lib/container.info');
const { prototypeScriptPath, contextName, defaultContextName, typeInfoFilePath, isContextSingleton, scriptOutputDirPath } = require('./map.arguments');
containerInfo.add({ prototypeScriptPath, contextName, defaultContextName, isContextSingleton, containerInfoOutputDirPath: scriptOutputDirPath });
containerInfo.resolve({ prototypeScriptPath, typeInfoFilePath, containerInfoOutputDirPath: scriptOutputDirPath });
