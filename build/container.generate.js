const { readFileSync, writeFileSync, mkdirSync, existsSync } = require('fs');
const path = require('path');
const utils = require('utils');
const factoryContainerTemplate = readFileSync(path.join(__dirname,'factory.container.template.json'),'utf8');

const typeConfig = require(path.join(__dirname, 'type.config.json'));
const typeBindingsConfig = require(path.join(__dirname, 'type.bindings.config.json'));

function walkDependencyTree(parent, callback) {
    let _break = false;
    for(const child of parent.children) {
        callback(child, () => {
            _break = true;
        });
        if (!_break) {
            walkDependencyTree(child, callback);
        }
    }
}
for(const typeName of Object.keys(typeConfig)) {
    const info = typeConfig[typeName];
    let factoryContainer = require(info.factoryContainerFilePath);
    if (utils.isEmptyObject(factoryContainer)) {
        const factoryContainerJson = factoryContainerTemplate
            .replace(/\[TypeName\]/g, info.typeName)
            .replace(/\[TypeVariableName\]/g, info.variableName)
            .replace(/\[PrototypePath\]/g, info.prototypePath)
            .replace(/\[FactoryScriptPath\]/g, info.factoryScriptPath)
            .replace(/\[Bindings\]/g, utils.getJSONString(typeBindingsConfig[info.typeName]));
        factoryContainer = utils.getJSONObject(factoryContainerJson);
        writeFileSync(info.factoryContainerFilePath, utils.getJSONString(factoryContainer), 'utf8');
    }
    walkDependencyTree(info, (typeInfo) => {
        const isReferenceArgument = typeInfo.prototypePath ? true: false;
        if (!factoryContainer.ctorArgsInfo.find(ctorArgInfo => ctorArgInfo.name === typeInfo.variableName)) {
            factoryContainer.ctorArgsInfo.push({ name: typeInfo.variableName, isReferenceArgument });
        };
    });
    writeFileSync(info.factoryContainerFilePath, utils.getJSONString(factoryContainer), 'utf8');
}