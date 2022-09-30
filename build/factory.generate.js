const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const factoryTemplate = readFileSync(path.join(__dirname,'factory.template'),'utf8');
const factoryInfoPath = path.join(__dirname, 'factory.info.json');
let factoryInfo = require(factoryInfoPath);

for(const factoryInfoName of Object.keys(factoryInfo)) {
    const info = factoryInfo[factoryInfoName];
    const { typeName, factoryContainerFilePath, ctorArgumentNames, ctorArgumentsWithBindingNames } = info;
    const factoryJson = factoryTemplate
        .replace(/\[FactoryContainerFilePath\]/g, factoryContainerFilePath )
        .replace(/\[TypeName\]/g, typeName)
        .replace(/\[PrimitiveArgs\]/g, ctorArgumentNames.join(','))
        .replace(/\[PrimitiveArgsWithBindingName\]/g, ctorArgumentsWithBindingNames.join(','));
    writeFileSync(info.factoryScriptPath, factoryJson, 'utf8');
};
