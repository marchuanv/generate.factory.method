#!/usr/bin/env node
const { existsSync } = require('fs');
const { scriptPath, prototypeScriptPath, scriptOutputDirPath } = require('./map.arguments');
 if (scriptPath && !existsSync(scriptPath)) {
     throw new Error(`${scriptPath} script does not exist.`);
 }
 if (prototypeScriptPath && !existsSync(prototypeScriptPath)) {
     throw new Error(`${prototypeScriptPath} script does not exist.`);
 }
 if (scriptOutputDirPath && !existsSync(scriptOutputDirPath)){
     throw new Error(`${scriptOutputDirPath} script does not exist.`);
 }