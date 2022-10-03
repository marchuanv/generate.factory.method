const { readFileSync, writeFileSync, existsSync } = require('fs');
const path = require('path');
const utils = require('utils');
const typesInfo = require(path.join(__dirname, 'types.info.json'));
const typeBindingsInfo = require(path.join(__dirname, 'type.bindings.info.json'));
const factoryContainerBindingInfoTemplate = readFileSync(path.join(__dirname, 'templates', 'factory.container.binding.info.template'),'utf8');
const factoryContainerBindingsInfoPath = path.join(__dirname, 'factory.container.bindings.info.json');
const factoryContainerBindingsInfo = {};

for(const typeName of Object.keys(typesInfo)) {
    const factoryGeneratedDir = path.join(__dirname, '../lib', 'factory', 'generated', typeName.toLowerCase());
    factoryContainerBindingsInfo[typeName] = {};
    const typeBindings = typeBindingsInfo.filter(bindInfo => bindInfo.typeName === typeName);
    for(const typeBinding of typeBindings) {
        const { isSingleton, ctorParameterInfo } = typeBinding;
        const bindingFileName =  `${typeName.toLowerCase()}.factory.container.${typeBinding.bindingName.toLowerCase()}.binding.json`;
        const bindingFilePath = path.join(factoryGeneratedDir, bindingFileName).replace(/\\/g,'//');
        factoryContainerBindingsInfo[typeName][typeBinding.bindingName] = utils.getJSONObject(factoryContainerBindingInfoTemplate
            .replace(/\[BindingFilePath\]/g, bindingFilePath)
            .replace(/\[CtorParameterInfo\]/g, utils.getJSONString(ctorParameterInfo))
            .replace(/\[isSingleton\]/g, isSingleton));
    }
};
writeFileSync(factoryContainerBindingsInfoPath, utils.getJSONString(factoryContainerBindingsInfo), 'utf8');
