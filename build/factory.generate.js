const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const path = require('path');

const factoryTemplate = readFileSync(path.join(__dirname, 'templates', 'factory.template'),'utf8');
const factoryInfoPath = path.join(__dirname, 'factory.info.json');
let factoryInfo = require(factoryInfoPath);

for(const factoryInfoName of Object.keys(factoryInfo)) {
    const info = factoryInfo[factoryInfoName];
    const { typeName, factoryContainerBindingFilePath, ctorArgumentNames, ctorArgumentsWithBindingNames } = info;
    const factoryGeneratedDir = path.join(__dirname, '../lib', 'factory', 'generated', typeName.toLowerCase());
    if (!existsSync(factoryGeneratedDir)){
        mkdirSync(factoryGeneratedDir);
    }
    const factoryJson = factoryTemplate
        .replace(/\[FactoryContainerBindingFilePath\]/g, factoryContainerBindingFilePath )
        .replace(/\[TypeName\]/g, typeName)
        .replace(/\[PrimitiveArgs\]/g, ctorArgumentNames.join(','))
        .replace(/\[PrimitiveArgsWithBindingName\]/g, ctorArgumentsWithBindingNames.join(','));
    writeFileSync(info.factoryScriptPath, factoryJson, 'utf8');
};
