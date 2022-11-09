const { readFileSync } = require('fs');
const path = require('path');
const nodeTree = require('./nodetree');
const utils = require('utils');
const containerInfoTemplate = readFileSync(path.join(__dirname,'templates', 'container.info.template'),'utf8');

module.exports = {
    register: ({ prototypeScriptPath, contextName, defaultContextName, isContextSingleton, typeInfoFilePath, containerInfoOutputDirPath }) => {
        const typeInfo = require(typeInfoFilePath);
        const script = require(prototypeScriptPath);
        const typeName = Object.keys(script)[0];
        const containerInfoFilePath = path.join(containerInfoOutputDirPath, 'container.info.json');
        if (nodeTree.exists({ nodeName: typeName, nodeTreeFilePath: containerInfoFilePath })) {

        } else {
            const info = typeInfo.find(tInfo => tInfo.typeName.toLowerCase() ===  typeName.toLowerCase());
            const containerFilePath = path.join(containerInfoOutputDirPath, `${typeName.toLowerCase()}.factory.${contextName}.container.js`).replace(/\\/g,'//');
            const defaultContainerFilePath = path.join(containerInfoOutputDirPath, `${typeName.toLowerCase()}.factory.${defaultContextName}.container.js`).replace(/\\/g,'//');
            const data = utils.getJSONObject(containerInfoTemplate
                .replace(/\[TypeName\]/g, typeName)
                .replace(/\[IsContextSingleton\]/g, isContextSingleton)
                .replace(/\[ContainerFilePath\]/g, containerFilePath)
                .replace(/\[DefaultContainerFilePath\]/g, defaultContainerFilePath)
                .replace(/\[VariableName\]/g, info.variableName)
                .replace(/\[ScriptPath\]/g, info.scriptPath)
                .replace(/\[ContextName\]/g, contextName)
                .replace(/\[DefaultContextName\]/g, defaultContextName)
                .replace(/\[IsSingleton\]/g, info.isSingleton)
            );
            if (nodeTree.currentNode) {
                nodeTree.createNode({ nodeName: typeName, parentNodeName: nodeTree.currentNode.name, data, nodeTreeFilePath: containerInfoFilePath });
            } else {
                nodeTree.createNode({ nodeName: typeName, data, nodeTreeFilePath: containerInfoFilePath });
            }
            for(const childInfo of info.childTypeInfoArray) {
                module.exports.register({
                    prototypeScriptPath: childInfo.prototypeScriptPath,
                    contextName,
                    defaultContextName,
                    isContextSingleton,
                    typeInfoFilePath,
                    containerInfoOutputDirPath
                });
            };
        }
        nodeTree.saveNodeTree({ nodeTreeFilePath: containerInfoFilePath });
    }
}
