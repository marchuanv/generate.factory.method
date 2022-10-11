const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const path = require('path');
const utils = require('utils');
const factoryInfoTemplate = readFileSync(path.join(__dirname, 'templates', 'factory.info.template'),'utf8');
const typesInfo = require(path.join(__dirname, 'types.info.json'));
const factoryInfoPath = path.join(__dirname, 'factory.info.json');
const factoryContainerBindingsInfo = require('./factory.container.bindings.info.json');
let factoryInfo = {};

writeFileSync(factoryInfoPath, utils.getJSONString({}), 'utf8');   

const enumerateBindings = ({ factoryContainerBindingName, typeName }, callback) => {
    for(const binding of factoryContainerBindingsInfo) {
        if (( (factoryContainerBindingName && binding.factoryContainerBindingName === factoryContainerBindingName) || !factoryContainerBindingName ) && ( (typeName && binding.typeName === typeName) || !typeName ) ) {
            callback(binding);
        }
    };
};

const populateParameters = (info, params) => {
    const children = info.children.filter(child => child.variableName !== 'factoryContainerBindingName');
    for(const child of children) {
        populateParameters(child, params);
        if (!child.prototypeScriptPath) {
            if (!params.find(name => name === child.variableName)) {
                params.push(child.variableName);
            }
        }
    };
}
module.exports = function({ factoryContainerBindingName }) {
    for(const typeName of Object.keys(typesInfo)) {
        const bindingFilePaths = {};
        const info = typesInfo[typeName];
        const scriptName = typeName.toLowerCase();
        const factoryGeneratedDir = path.join(__dirname, '../lib', 'factory', 'generated', scriptName);
        const factoryMinScriptFileName = `${scriptName}.factory.min.js`;
        const factoryMinScriptPath = path.join(factoryGeneratedDir, factoryMinScriptFileName).replace(/\\/g,'//');
        const ctorArgumentNames = [];
        populateParameters(info, ctorArgumentNames);
        const ctorArgumentsWithBindingNames = utils.getJSONObject(utils.getJSONString(ctorArgumentNames));
        ctorArgumentsWithBindingNames.push('factoryContainerBindingName');
        let _factoryScriptPath;
        enumerateBindings({ typeName }, ({ bindingName, bindingFilePath, factoryScriptPath }) => {
            bindingFilePaths[bindingName] = bindingFilePath;
            _factoryScriptPath = factoryScriptPath;
        });
        const factoryInfoJson = factoryInfoTemplate
            .replace(/\[TypeName\]/g, typeName)
            .replace(/\[FactoryScriptPath\]/g, _factoryScriptPath)
            .replace(/\[MinFactoryScriptPath\]/g, factoryMinScriptPath)
            .replace(/\[FactoryContainerBindingFilePaths\]/g, utils.getJSONString(bindingFilePaths))
            .replace(/\[CtorArgumentNames\]/g, utils.getJSONString(ctorArgumentNames))
            .replace(/\[CtorArgumentsWithBindingNames\]/g, utils.getJSONString(ctorArgumentsWithBindingNames));
        const _factoryInfo = utils.getJSONObject(factoryInfoJson);
        factoryInfo[typeName] = _factoryInfo;
    };
    writeFileSync(factoryInfoPath, utils.getJSONString(factoryInfo), 'utf8');
}
