const { readFileSync, writeFileSync, existsSync } = require('fs');
const path = require('path');
const utils = require('utils');
const typeInfo = require(path.join(__dirname, 'type.info.json'));
const factoryInfo = require(path.join(__dirname, 'factory.info.json'));
const typeBindingsInfo = require(path.join(__dirname, 'type.bindings.info.json'));
const factoryContainerBindingTemplate = readFileSync(path.join(__dirname, 'templates', 'factory.container.binding.template.json'),'utf8');
const factoryContainerBindingsInfo = require('./factory.container.bindings.info.json');

for(const _typeName of Object.keys(typeInfo)) {
    const info = typeInfo[_typeName];
    const factoryContainerBindingInfo = factoryContainerBindingsInfo[_typeName];

    // const { typeName, variableName, prototypePath } = info;
    // const typeBindings = typeBindingsInfo[typeName];
    // const ctorArgsInfo = [];
    // const { factoryContainerFilePath, factoryScriptPath } = factoryInfo[typeName];
    // const factoryContainerTemplate = readFileSync(path.join(__dirname,'factory.container.template'),'utf8');
    // const factoryContainerBindingFilePath = path.join(factoryGeneratedDir, factoryContainerJsonFileName).replace(/\\/g,'//');


    const factoryContainerBindingJson = factoryContainerBindingTemplate
        .replace(/\[FactoryContainerBindingName\]/g, factoryContainerBindingName)
        .replace(/\[FactoryContainerBindingFilePath\]/g, factoryContainerBindingFilePath)
        .replace(/\[isSingleton\]/g, isSingleton)
        .replace(/\[CtorArguments\]/g, factoryScriptPath);
    writeFileSync(factoryContainerBindingInfo.factoryContainerBindingFilePath, factoryContainerBindingJson, 'utf8');
};
