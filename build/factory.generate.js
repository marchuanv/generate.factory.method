const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const path = require('path');
const utils = require('utils');

const factoryTemplate = readFileSync(path.join(__dirname, 'templates', 'factory.template'),'utf8');
const factoryInfoPath = path.join(__dirname, 'factory.info.json');
let factoryInfo = require(factoryInfoPath);

for(const factoryInfoName of Object.keys(factoryInfo)) {
    const info = factoryInfo[factoryInfoName];
    const { typeName, factoryContainerContextFilePaths, ctorArgumentNames, ctorArgumentsWithContextNames } = info;
    const factoryGeneratedDir = path.join(__dirname, '../lib', 'factory', 'generated', typeName.toLowerCase());
    if (!existsSync(factoryGeneratedDir)){
        mkdirSync(factoryGeneratedDir);
    }
    const factoryJson = factoryTemplate
        .replace(/\[FactoryContainerContextFilePaths\]/g, utils.getJSONString(factoryContainerContextFilePaths))
        .replace(/\[TypeName\]/g, typeName)
        .replace(/\[PrimitiveArgs\]/g, ctorArgumentNames.join(','))
        .replace(/\[PrimitiveArgsWithContextName\]/g, ctorArgumentsWithContextNames.join(','));
    writeFileSync(info.factoryScriptPath, factoryJson, 'utf8');
};
