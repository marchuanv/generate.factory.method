const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const path = require('path');
const typeInfo = require(path.join(__dirname, 'type.info.json'));
const factoryContainerBindingTemplate = readFileSync(path.join(__dirname, 'templates', 'factory.container.binding.template'),'utf8');
const factoryContainerBindingsInfo = require('./factory.container.bindings.info.json');

for(const typeName of Object.keys(typeInfo)) {
    const factoryContainerBindingInfo = factoryContainerBindingsInfo[typeName];
    for(const factoryContainerBindingName of Object.keys(factoryContainerBindingInfo)) {
        const bindingInfo = factoryContainerBindingInfo[factoryContainerBindingName];
        const factoryGeneratedDir = path.join(__dirname, '../lib', 'factory', 'generated', typeName.toLowerCase());
        if (!existsSync(factoryGeneratedDir)){
            mkdirSync(factoryGeneratedDir);
        }
        const factoryContainerBindingJson = factoryContainerBindingTemplate
            .replace(/\[BindingName\]/g, factoryContainerBindingName)
            .replace(/\[IsSingleton\]/g, bindingInfo.isSingleton)
            .replace(/\[CtorArguments\]/g, '{}');
        writeFileSync(bindingInfo.bindingFilePath, factoryContainerBindingJson, 'utf8');
    };
};
