const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const utils = require('utils');
const typesInfo = require(path.join(__dirname, 'types.info.json'));
const typesSingletonInfo = require(path.join(__dirname, 'types.singleton.info.json'));
const factoryContainerContextInfoTemplate = readFileSync(path.join(__dirname, 'templates', 'factory.container.context.info.template'),'utf8');
const factoryContainerContextInfoPath = path.join(__dirname, 'factory.container.context.info.json');
const defaultContextName = 'Default';

writeFileSync(factoryContainerContextInfoPath, utils.getJSONString([]), 'utf8');
let factoryContainerContextInfo = [];

function factoryContainerContextInfoGenerate({ contextName }) {
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
        const contextFileName =  `${typeName.toLowerCase()}.factory.container.${contextName.toLowerCase()}.context.json`;
        const contextFilePath = path.join(factoryGeneratedDir, contextFileName).replace(/\\/g,'//');
        const defaultContextFileName =  `${typeName.toLowerCase()}.factory.container.default.context.json`;
        const defaultContextFilePath = path.join(factoryGeneratedDir, defaultContextFileName).replace(/\\/g,'//');
        const isContextSingleton = typesSingletonInfo[typeName].isContextSingleton;
        const context = utils.getJSONObject(factoryContainerContextInfoTemplate
            .replace(/\[TypeName\]/g, typeName)
            .replace(/\[TypeVariableName\]/g, variableName)
            .replace(/\[ScriptPath\]/g, scriptPath)
            .replace(/\[PrototypeScriptPath\]/g, prototypeScriptPath)
            .replace(/\[FactoryScriptPath\]/g, factoryScriptPath)
            .replace(/\[ContextName\]/g, contextName)
            .replace(/\[ContextFilePath\]/g, contextFilePath)
            .replace(/\[DefaultContextName\]/g, 'Default')
            .replace(/\[DefaultContextFilePath\]/g, defaultContextFilePath)
            .replace(/\[CtorParametersInfo\]/g, utils.getJSONString(ctorParametersInfo))
            .replace(/\[IsContextSingleton\]/g, isContextSingleton)
            .replace(/\[isSingleton\]/g, isSingleton));
            factoryContainerContextInfo.push(context);
    };
    writeFileSync(factoryContainerContextInfoPath, utils.getJSONString(factoryContainerContextInfo), 'utf8');
}
factoryContainerContextInfoGenerate({ contextName: defaultContextName });
module.exports = factoryContainerContextInfoGenerate;