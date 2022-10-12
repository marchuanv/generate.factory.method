const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const utils = require('utils');
const typesInfo = require(path.join(__dirname, 'types.info.json'));
const typesSingletonInfo = require(path.join(__dirname, 'types.singleton.info.json'));
const factoryContainerBindingInfoTemplate = readFileSync(path.join(__dirname, 'templates', 'factory.container.binding.info.template'),'utf8');
const factoryContainerBindingsInfoPath = path.join(__dirname, 'factory.container.bindings.info.json');
const defaultBindingName = 'Default';

writeFileSync(factoryContainerBindingsInfoPath, utils.getJSONString([]), 'utf8');
let factoryContainerBindingsInfo = [];

function factoryContainerBindingsInfoGenerate({ factoryContainerBindingName }) {
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
        const defaultBindingFileName =  `${typeName.toLowerCase()}.factory.container.default.binding.json`;
        const defaultBindingFilePath = path.join(factoryGeneratedDir, defaultBindingFileName).replace(/\\/g,'//');
        const isBindingSingleton = typesSingletonInfo[typeName].isBindingSingleton;
        const binding = utils.getJSONObject(factoryContainerBindingInfoTemplate
            .replace(/\[TypeName\]/g, typeName)
            .replace(/\[TypeVariableName\]/g, variableName)
            .replace(/\[ScriptPath\]/g, scriptPath)
            .replace(/\[PrototypeScriptPath\]/g, prototypeScriptPath)
            .replace(/\[FactoryScriptPath\]/g, factoryScriptPath)
            .replace(/\[BindingName\]/g, factoryContainerBindingName)
            .replace(/\[BindingFilePath\]/g, bindingFilePath)
            .replace(/\[DefaultBindingName\]/g, 'Default')
            .replace(/\[DefaultBindingFilePath\]/g, defaultBindingFilePath)
            .replace(/\[CtorParametersInfo\]/g, utils.getJSONString(ctorParametersInfo))
            .replace(/\[IsBindingSingleton\]/g, isBindingSingleton)
            .replace(/\[isSingleton\]/g, isSingleton));
        factoryContainerBindingsInfo.push(binding);
    };
    writeFileSync(factoryContainerBindingsInfoPath, utils.getJSONString(factoryContainerBindingsInfo), 'utf8');
}
factoryContainerBindingsInfoGenerate({ factoryContainerBindingName: defaultBindingName });
module.exports = factoryContainerBindingsInfoGenerate;