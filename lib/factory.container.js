const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const path = require('path');
const utils = require('utils');
const factoryContainerContextTemplate = readFileSync(path.join(__dirname, 'templates', 'factory.container.context.template'),'utf8');

module.exports = {
    generate: ({
            typeInfo,
            scriptPath,
            isContextSingleton,
            contextName,
            defaultContextName,
            jsonOutputDirPath
        }) => 
    {

        const contextFilePath = path.join(jsonOutputDirPath, `factory.${contextName}.container.json`);
        const { typeName, isSingleton, variableName } = typeInfo;

        for(const ctorParamName of Object.keys(ctorParametersInfo)) {
            const typeName = ctorParametersInfo[ctorParamName];
            if (typeName) {
                ctorParametersInfo[ctorParamName] = { contextFilePath: null };
                enumerateContext({ contextName, typeName }, ({ contextFilePath }) => {
                    ctorParametersInfo[ctorParamName].contextFilePath = contextFilePath;
                });
            } else {
                ctorParametersInfo[ctorParamName] = null;
            }
        };
        const factoryContainerContextJson = factoryContainerContextTemplate
            .replace(/\[TypeName\]/g, typeName)
            .replace(/\[TypeVariableName\]/g, typeVariableName)
            .replace(/\[ScriptPath\]/g, scriptPath)
            .replace(/\[ContextName\]/g, contextName)
            .replace(/\[ContextFilePath\]/g, contextFilePath)
            .replace(/\[DefaultContextName\]/g, defaultContextName)
            .replace(/\[DefaultContextFilePath\]/g, defaultContextFilePath)
            .replace(/\[IsContextSingleton\]/g, isContextSingleton)
            .replace(/\[IsSingleton\]/g, isSingleton)
            .replace(/\[CtorParameters\]/g, utils.getJSONString(ctorParametersInfo));
        const newFactoryContainerContext = utils.getJSONObject(factoryContainerContextJson);
        if (existsSync(contextFilePath)) {
            const existingFactoryContainerContext = require(contextFilePath);
            existingFactoryContainerContext.typeName = newFactoryContainerContext.typeName;
            existingFactoryContainerContext.typeVariableName = newFactoryContainerContext.typeVariableName;
            existingFactoryContainerContext.scriptPath = newFactoryContainerContext.scriptPath;
            existingFactoryContainerContext.contextName = newFactoryContainerContext.contextName;
            existingFactoryContainerContext.contextFilePath = newFactoryContainerContext.contextFilePath;
            existingFactoryContainerContext.defaultContextName = newFactoryContainerContext.defaultContextName;
            existingFactoryContainerContext.defaultContextFilePath = newFactoryContainerContext.defaultContextFilePath;
            existingFactoryContainerContext.isSingleton = newFactoryContainerContext.isSingleton;
            existingFactoryContainerContext.isContextSingleton = newFactoryContainerContext.isContextSingleton;
            if (!existingFactoryContainerContext.ctorParameters) {
                existingFactoryContainerContext.ctorParameters = newFactoryContainerContext.ctorParameters;
            }
            for(const ctorParamName of Object.keys(newFactoryContainerContext.ctorParameters)) { //only want to add new ones, NOT overwrite
                if (existingFactoryContainerContext.ctorParameters[ctorParamName] === undefined) {
                    existingFactoryContainerContext.ctorParameters[ctorParamName] = newFactoryContainerContext.ctorParameters[ctorParamName];
                }
            };
            writeFileSync(contextFilePath, utils.getJSONString(existingFactoryContainerContext), 'utf8');
        } else {
            writeFileSync(contextFilePath, utils.getJSONString(newFactoryContainerContext), 'utf8');
        }
    }
};