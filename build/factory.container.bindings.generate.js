const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const path = require('path');
const utils = require('utils');
const typesInfo = require(path.join(__dirname, 'types.info.json'));
const factoryContainerBindingTemplate = readFileSync(path.join(__dirname, 'templates', 'factory.container.binding.template'),'utf8');
const factoryContainerBindingsInfo = require('./factory.container.bindings.info.json');

const enumerateBindings = ({ factoryContainerBindingName, typeName }, callback) => {
    for(const _typeName of Object.keys(typesInfo)) {
        if (typeName && typeName !== _typeName) {
            continue;
        }
        for(const binding of factoryContainerBindingsInfo) {
            if (binding.bindingName === factoryContainerBindingName) {
                callback(binding);
            }
        };
    };
};

module.exports = function({ factoryContainerBindingName }) {
    enumerateBindings({ factoryContainerBindingName, typeName: null }, ({
        ctorParametersInfo,
        isSingleton,
        scriptPath,
        prototypeScriptPath,
        typeVariableName,
        bindingFilePath,
        bindingName,
        typeName,
        factoryScriptPath
   }) => {
        for(const ctorParamName of Object.keys(ctorParametersInfo)) {
            const param = ctorParametersInfo[ctorParamName];
            if (param) {
                if (factoryContainerBindingsInfo[ctorParamName]) {
                    enumberateBindings({ factoryContainerBindingName, typeName: ctorParamName }, ({ bindingFilePath }) => {
                        ctorParametersInfo[ctorParamName] = { bindingFilePath };
                    });
                } else {
                    ctorParametersInfo[ctorParamName] = null;
                }
            }
        };
        const factoryGeneratedDir = path.join(__dirname, '../lib', 'factory', 'generated', typeName.toLowerCase());
        if (!existsSync(factoryGeneratedDir)){
            mkdirSync(factoryGeneratedDir);
        }
        const factoryContainerBindingJson = factoryContainerBindingTemplate
            .replace(/\[TypeName\]/g, typeName)
            .replace(/\[TypeVariableName\]/g, typeVariableName)
            .replace(/\[ScriptPath\]/g, scriptPath)
            .replace(/\[PrototypeScriptPath\]/g, prototypeScriptPath)
            .replace(/\[FactoryScriptPath\]/g, factoryScriptPath)
            .replace(/\[BindingName\]/g, bindingName)
            .replace(/\[BindingFilePath\]/g, bindingFilePath)
            .replace(/\[IsSingleton\]/g, isSingleton)
            .replace(/\[CtorParameters\]/g, utils.getJSONString(ctorParametersInfo));
        const factoryContainerBinding = utils.getJSONObject(factoryContainerBindingJson);
        writeFileSync(bindingFilePath, utils.getJSONString(factoryContainerBinding), 'utf8');
    });
}
