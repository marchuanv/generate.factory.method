const { readFileSync, writeFileSync, existsSync } = require('fs');
const path = require('path');
const utils = require('utils');
const typesInfo = require(path.join(__dirname, 'types.info.json'));
const factoryInfo = require(path.join(__dirname, 'factory.info.json'));
const factoryContainerBindingsInfo = require(path.join(__dirname, 'factory.container.bindings.info.json'));
const factoryContainerTemplate = readFileSync(path.join(__dirname, 'templates', 'factory.container.template'),'utf8');

for(const _typeName of Object.keys(typesInfo)) {
    const info = typesInfo[_typeName];
    const { typeName, variableName, scriptPath, prototypeScriptPath } = info;
    const factoryContainerBindingInfo = factoryContainerBindingsInfo[typeName];
    const bindings = {};
    for(const bindingName of Object.keys(factoryContainerBindingInfo)) {
        const { bindingFilePath } = factoryContainerBindingsInfo[typeName][bindingName];
        bindings[bindingName] = {
            bindingFilePath
        };
    };
    const { factoryContainerFilePath, factoryScriptPath } = factoryInfo[typeName];
    const factoryContainerJson = factoryContainerTemplate
        .replace(/\[TypeName\]/g, typeName)
        .replace(/\[TypeVariableName\]/g, variableName)
        .replace(/\[ScriptPath\]/g, scriptPath)
        .replace(/\[PrototypeScriptPath\]/g, prototypeScriptPath)
        .replace(/\[FactoryScriptPath\]/g, factoryScriptPath)
        .replace(/\[Bindings\]/g, utils.getJSONString(bindings));
    const factoryContainer = utils.getJSONObject(factoryContainerJson);
    writeFileSync(factoryContainerFilePath, utils.getJSONString(factoryContainer), 'utf8');
};
