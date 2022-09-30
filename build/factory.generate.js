const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const factoryTemplate = readFileSync(path.join(__dirname,'factory.template'),'utf8');
const factoryInfoPath = path.join(__dirname, 'factory.info.json');
let factoryInfo = require(factoryInfoPath);

for(const factoryInfoName of Object.keys(factoryInfo)) {
    const info = factoryInfo[factoryInfoName];
    const { typeName, factoryContainerFilePath, primitiveArgs, primitiveArgsWithBindingName } = info;
    const factoryJson = factoryTemplate
        .replace(/\[FactoryContainerFilePath\]/g, factoryContainerFilePath )
        .replace(/\[TypeName\]/g, typeName)
        .replace(/\[PrimitiveArgs\]/g, Object.keys(primitiveArgs).join(','))
        .replace(/\[PrimitiveArgsWithBindingName\]/g, Object.keys(primitiveArgsWithBindingName).join(','));
    writeFileSync(info.factoryScriptPath, factoryJson, 'utf8');
};
