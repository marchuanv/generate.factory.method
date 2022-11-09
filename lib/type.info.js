const { readFileSync } = require('fs');
const path = require('path');
const utils = require('utils');
const typeInfoTemplate = readFileSync(path.join(__dirname,'templates', 'type.info.template'),'utf8');
const nodeTree = require('./nodetree');

module.exports = {
    register: ({ scriptPath, prototypeScriptPath, isSingleton, typeInfoDirPath, typeInfoOutputDirPath }) => {
        const script = require(prototypeScriptPath);
        const typeName = Object.keys(script)[0];
        const type = script[typeName];
        const typeInfoFilePath = path.join(typeInfoOutputDirPath, 'type.info.json');
        if (nodeTree.exists({ nodeName: typeName, nodeTreeFilePath: typeInfoFilePath })) {

        } else {
            const data = utils.getJSONObject(typeInfoTemplate
                .replace(/\[TypeName\]/g, type.name)
                .replace(/\[IsSingleton\]/g, isSingleton)
                .replace(/\[IsRef\]/g, true)
                .replace(/\[PrototypeScriptPath\]/g, prototypeScriptPath.replace(/\\/g,'//'))
                .replace(/\[ScriptPath\]/g, scriptPath.replace(/\\/g,'//'))
                .replace(/\[VariableName\]/g, `${type.name.split('')[0].toLowerCase()}${type.name.split('').splice(1,999).join('')}`)
            );
            if (nodeTree.currentNode) {
                nodeTree.createNode({ nodeName: typeName, parentNodeName: nodeTree.currentNode.name, data, nodeTreeFilePath: typeInfoFilePath });
            } else {
                nodeTree.createNode({ nodeName: typeName, data, nodeTreeFilePath: typeInfoFilePath });
            }
            const parameters = utils.getFunctionParams(type) || [];
            for(const param of parameters) {
                {
                    const scriptName = param.name.toLowerCase();
                    const scriptPath = path.join(typeInfoDirPath, `${scriptName}.js`);
                    const prototypeScriptPath = path.join(typeInfoDirPath, `${scriptName}.prototype.js`);
                    module.exports.register({
                        scriptPath,
                        prototypeScriptPath,
                        isSingleton,
                        typeInfoDirPath,
                        typeInfoOutputDirPath
                    });
                }
            };
        }
        nodeTree.saveNodeTree({ nodeTreeFilePath: typeInfoFilePath });
    }
}
