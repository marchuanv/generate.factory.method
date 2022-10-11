const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const utils = require('utils');
const typesInfo = require(path.join(__dirname, 'types.info.json'));
const factoryContainerBindingInfoTemplate = readFileSync(path.join(__dirname, 'templates', 'factory.container.binding.info.template'),'utf8');
const factoryContainerBindingsInfoPath = path.join(__dirname, 'factory.container.bindings.info.json');

writeFileSync(factoryContainerBindingsInfoPath, utils.getJSONString([]), 'utf8');
let factoryContainerBindingsInfo = [];

module.exports = function({ factoryContainerBindingName }) {
    for(const typeName of Object.keys(typesInfo)) {
        const factoryGeneratedDir = path.join(__dirname, '../lib', 'factory', 'generated', typeName.toLowerCase());
        const factoryScriptFileName = `${typeName.toLowerCase()}.factory.js`;
        const factoryScriptPath = path.join(factoryGeneratedDir, factoryScriptFileName).replace(/\\/g,'//');
        const { variableName, scriptPath, prototypeScriptPath } = typesInfo[typeName];
        const { children, isSingleton } = typesInfo[typeName];
        const ctorParametersInfo  = children.reduce((newParamInfo, child) => {
            if (child.scriptPath) {
                newParamInfo[child.variableName] = child.typeName;
            } else {
                newParamInfo[child.variableName] = null;
            }
            return newParamInfo;
        },{});
        const bindingFileName =  `${typeName.toLowerCase()}.factory.container.${factoryContainerBindingName.toLowerCase()}.binding.json`;
        const bindingFilePath = path.join(factoryGeneratedDir, bindingFileName).replace(/\\/g,'//');
        const binding = utils.getJSONObject(factoryContainerBindingInfoTemplate
            .replace(/\[TypeName\]/g, typeName)
            .replace(/\[TypeVariableName\]/g, variableName)
            .replace(/\[ScriptPath\]/g, scriptPath)
            .replace(/\[PrototypeScriptPath\]/g, prototypeScriptPath)
            .replace(/\[FactoryScriptPath\]/g, factoryScriptPath)
            .replace(/\[BindingName\]/g, factoryContainerBindingName)
            .replace(/\[CtorParametersInfo\]/g, utils.getJSONString(ctorParametersInfo))
            .replace(/\[BindingFilePath\]/g, bindingFilePath)
            .replace(/\[isSingleton\]/g, isSingleton));
        binding.Id = utils.generateGUID();
        factoryContainerBindingsInfo.push(binding);
        if (isSingleton) {
            const nonDefaultBindings = factoryContainerBindingsInfo.filter(cb =>  cb.typeName === typeName && cb.bindingName !== 'Default');
            if (nonDefaultBindings.length > 0) {
                factoryContainerBindingsInfo = factoryContainerBindingsInfo.filter(cb => nonDefaultBindings.find(cb2 => cb.Id === cb2.Id) === undefined );
            }
        }
    };
    writeFileSync(factoryContainerBindingsInfoPath, utils.getJSONString(factoryContainerBindingsInfo), 'utf8');
}