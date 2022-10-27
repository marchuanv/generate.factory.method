const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const path = require('path');
const utils = require('utils');
const factoryContainerTemplate = readFileSync(path.join(__dirname, 'templates', 'factory.container.template'),'utf8');

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

        const { typeName, isSingleton, variableName, childInfoArray } = typeInfo;

        const contextFilePath = path.join(jsonOutputDirPath, `${typeName.toLowerCase()}.factory.${contextName.toLowerCase()}.container.json`);
        const defaultContextFilePath = path.join(jsonOutputDirPath, `factory.default.container.json`);

        const ctorParameters = {};
        for(const childInfo of childInfoArray) {
            const { typeName, variableName, isRef } = childInfo;
            if (isRef) {
                ctorParametersInfo[ctorParamName] = { contextFilePath: null };
                enumerateContext({ contextName, typeName }, ({ contextFilePath }) => {
                    ctorParameters[ctorParamName].contextFilePath = contextFilePath;
                });
            } else {
                ctorParameters[variableName] = null;
            }
        };
        const factoryContainerContextJson = factoryContainerTemplate
            .replace(/\[TypeName\]/g, typeName)
            .replace(/\[TypeVariableName\]/g, variableName)
            .replace(/\[ScriptPath\]/g, scriptPath.replace(/\\/g,'//'))
            .replace(/\[ContextName\]/g, contextName)
            .replace(/\[ContextFilePath\]/g, contextFilePath.replace(/\\/g,'//'))
            .replace(/\[DefaultContextName\]/g, defaultContextName)
            .replace(/\[DefaultContextFilePath\]/g, defaultContextFilePath.replace(/\\/g,'//'))
            .replace(/\[IsContextSingleton\]/g, isContextSingleton)
            .replace(/\[IsSingleton\]/g, isSingleton)
            .replace(/\[CtorParameters\]/g, utils.getJSONString(ctorParameters));
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