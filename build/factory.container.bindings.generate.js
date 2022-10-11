const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const path = require('path');
const utils = require('utils');
const factoryContainerBindingTemplate = readFileSync(path.join(__dirname, 'templates', 'factory.container.binding.template'),'utf8');
const factoryContainerBindingsInfo = require('./factory.container.bindings.info.json');

const enumerateBindings = ({ factoryContainerBindingName, typeName }, callback) => {
    for(const binding of factoryContainerBindingsInfo) {
        if (binding.bindingName === factoryContainerBindingName && ( (typeName && binding.typeName === typeName) || !typeName ) ) {
            callback(binding);
        }
    };
};

function factoryContainerBindingsGenerate({ factoryContainerBindingName }) {
    enumerateBindings({ factoryContainerBindingName, typeName: null }, ({
        ctorParametersInfo,
        scriptPath,
        isSingleton,
        typeVariableName,
        bindingName,
        bindingFilePath,
        defaultBindingName,
        defaultBindingFilePath,
        typeName
   }) => {
        
        const factoryGeneratedDir = path.join(__dirname, '../lib', 'factory', 'generated', typeName.toLowerCase());
        if (!existsSync(factoryGeneratedDir)){
            mkdirSync(factoryGeneratedDir);
        }

        for(const ctorParamName of Object.keys(ctorParametersInfo)) {
            const typeName = ctorParametersInfo[ctorParamName];
            if (typeName) {
                ctorParametersInfo[ctorParamName] = { bindingFilePath: null };
                enumerateBindings({ factoryContainerBindingName, typeName }, ({ bindingFilePath }) => {
                    ctorParametersInfo[ctorParamName].bindingFilePath = bindingFilePath;
                });
            } else {
                ctorParametersInfo[ctorParamName] = null;
            }
        };
        const factoryContainerBindingJson = factoryContainerBindingTemplate
            .replace(/\[TypeName\]/g, typeName)
            .replace(/\[TypeVariableName\]/g, typeVariableName)
            .replace(/\[ScriptPath\]/g, scriptPath)
            .replace(/\[BindingName\]/g, bindingName)
            .replace(/\[BindingFilePath\]/g, bindingFilePath)
            .replace(/\[DefaultBindingName\]/g, defaultBindingName)
            .replace(/\[DefaultBindingFilePath\]/g, defaultBindingFilePath)
            .replace(/\[IsSingleton\]/g, isSingleton)
            .replace(/\[CtorParameters\]/g, utils.getJSONString(ctorParametersInfo));
        const newFactoryContainerBinding = utils.getJSONObject(factoryContainerBindingJson);
        if (existsSync(bindingFilePath)) {
            const existingFactoryContainerBinding = require(bindingFilePath);
            existingFactoryContainerBinding.typeName = newFactoryContainerBinding.typeName;
            existingFactoryContainerBinding.typeVariableName = newFactoryContainerBinding.typeVariableName;
            existingFactoryContainerBinding.scriptPath = newFactoryContainerBinding.scriptPath;
            existingFactoryContainerBinding.bindingName = newFactoryContainerBinding.bindingName;
            existingFactoryContainerBinding.bindingFilePath = newFactoryContainerBinding.bindingFilePath;
            existingFactoryContainerBinding.defaultBindingName = newFactoryContainerBinding.defaultBindingName;
            existingFactoryContainerBinding.defaultBindingFilePath = newFactoryContainerBinding.defaultBindingFilePath;
            existingFactoryContainerBinding.isSingleton = newFactoryContainerBinding.isSingleton;
            if (!existingFactoryContainerBinding.ctorParameters) {
                existingFactoryContainerBinding.ctorParameters = newFactoryContainerBinding.ctorParameters;
            }
            for(const ctorParamName of Object.keys(newFactoryContainerBinding.ctorParameters)) { //only want to add new ones, NOT overwrite
                if (existingFactoryContainerBinding.ctorParameters[ctorParamName] === undefined) {
                    existingFactoryContainerBinding.ctorParameters[ctorParamName] = newFactoryContainerBinding.ctorParameters[ctorParamName];
                }
            };
            writeFileSync(bindingFilePath, utils.getJSONString(existingFactoryContainerBinding), 'utf8');
        } else {
            writeFileSync(bindingFilePath, utils.getJSONString(newFactoryContainerBinding), 'utf8');
        }
    });
}
factoryContainerBindingsGenerate({ factoryContainerBindingName: 'Default' });
module.exports = factoryContainerBindingsGenerate;