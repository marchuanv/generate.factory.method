#!/usr/bin/env node
const containerInfo = require('../lib/container.info');
const { prototypeScriptPath, contextName, defaultContextName, typeInfoFilePath, isContextSingleton, scriptOutputDirPath } = require('./map.arguments');
containerInfo.register({ prototypeScriptPath, contextName, defaultContextName, isContextSingleton, typeInfoFilePath, containerInfoOutputDirPath: scriptOutputDirPath });
