const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const path = require('path');
const utils = require('utils');
const typesInfo = require(path.join(__dirname, 'types.info.json'));
const factoryContainerBindingTemplate = readFileSync(path.join(__dirname, 'templates', 'factory.container.binding.template'),'utf8');
const factoryContainerBindingsInfo = require('./factory.container.bindings.info.json');

const enumerateBindings = ({ factoryContainerBindingName, typeName }, callback) => {
    for(const binding of factoryContainerBindingsInfo) {
        if (binding.bindingName === factoryContainerBindingName && ( (typeName && binding.typeName === typeName) || !typeName ) ) {
            callback(binding);
        }
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
                ctorParametersInfo[ctorParamName] = null;
                enumerateBindings({ factoryContainerBindingName, typeName: ctorParamName }, ({ bindingFilePath, typeVariableName}) => {
                    ctorParametersInfo[typeVariableName] = { bindingFilePath };
                });
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
            .replace(/\[BindingName\]/g, bindingName)
            .replace(/\[BindingFilePath\]/g, bindingFilePath)
            .replace(/\[IsSingleton\]/g, isSingleton)
            .replace(/\[CtorParameters\]/g, utils.getJSONString(ctorParametersInfo));
        const factoryContainerBinding = utils.getJSONObject(factoryContainerBindingJson);
        writeFileSync(bindingFilePath, utils.getJSONString(factoryContainerBinding), 'utf8');
    });
}
