#!/usr/bin/env node
const typeInfo = require('../lib/type.info');
const { existsSync } = require('fs');
const { scriptPath, isSingleton, scriptOutputDirPath } = require('./map.arguments');

if (!existsSync(scriptPath)) {
    throw new Error(`${scriptPath} script does not exist.`);
}
if (!existsSync(scriptOutputDirPath)){
    throw new Error(`${scriptOutputDirPath} script does not exist.`);
}

const script = require(scriptPath);
const key = Object.keys(script)[0];
const type = script[key];

typeInfo.add({ type, isSingleton, typeInfoOutputDirPath:  scriptOutputDirPath });
typeInfo.resolve({ type, typeInfoOutputDirPath:  scriptOutputDirPath });
