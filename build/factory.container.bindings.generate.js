const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const path = require('path');
const utils = require('utils');
const typesInfo = require(path.join(__dirname, 'types.info.json'));
const factoryContainerBindingTemplate = readFileSync(path.join(__dirname, 'templates', 'factory.container.binding.template'),'utf8');
const factoryContainerBindingsInfo = require('./factory.container.bindings.info.json');

for(const typeName of Object.keys(typesInfo)) {
    const factoryContainerBindingInfo = factoryContainerBindingsInfo[typeName];
    for(const factoryContainerBindingName of Object.keys(factoryContainerBindingInfo)) {
        let { bindingFilePath, isSingleton, ctorParameterInfo } = factoryContainerBindingInfo[factoryContainerBindingName];
        ctorParameterInfo = ctorParameterInfo.reduce((params, param) => {
            if (param.typeName) {
                const depBinding =  factoryContainerBindingsInfo[param.typeName][factoryContainerBindingName];
                params[param.name] = { bindingFilePath: depBinding.bindingFilePath };
            } else {
                params[param.name] = null;
            }
            return params;
        },{});
        const factoryGeneratedDir = path.join(__dirname, '../lib', 'factory', 'generated', typeName.toLowerCase());
        if (!existsSync(factoryGeneratedDir)){
            mkdirSync(factoryGeneratedDir);
        }
        const factoryContainerBindingJson = factoryContainerBindingTemplate
            .replace(/\[BindingName\]/g, factoryContainerBindingName)
            .replace(/\[IsSingleton\]/g, isSingleton)
            .replace(/\[CtorParameters\]/g, utils.getJSONString(ctorParameterInfo));
        const factoryContainerBinding = utils.getJSONObject(factoryContainerBindingJson);
        writeFileSync(bindingFilePath, utils.getJSONString(factoryContainerBinding), 'utf8');
    };
};
