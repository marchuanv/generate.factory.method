const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const path = require('path');
const utils = require('utils');
const factoryInfoTemplate = readFileSync(path.join(__dirname, 'templates', 'factory.info.template'),'utf8');
const typesInfo = require(path.join(__dirname, 'types.info.json'));
const factoryInfoPath = path.join(__dirname, 'factory.info.json');
const factoryContainerContextInfo = require('./factory.container.context.info.json');
let factoryInfo = {};

writeFileSync(factoryInfoPath, utils.getJSONString({}), 'utf8');   

const enumerateContext = ({ contextName, typeName }, callback) => {
    for(const context of factoryContainerContextInfo) {
        if (( (contextName && context.contextName === contextName) || !contextName ) && ( (typeName && context.typeName === typeName) || !typeName ) ) {
            callback(context);
        }
    };
};

const populateParameters = (info, params) => {
    const children = info.children.filter(child => child.variableName !== 'contextName');
    for(const child of children) {
        populateParameters(child, params);
        if (!child.prototypeScriptPath) {
            if (!params.find(name => name === child.variableName)) {
                params.push(child.variableName);
            }
        }
    };
}

for(const typeName of Object.keys(typesInfo)) {
    const contextFilePaths = {};
    const info = typesInfo[typeName];
    const scriptName = typeName.toLowerCase();
    const factoryGeneratedDir = path.join(__dirname, '../lib', 'factory', 'generated', scriptName);
    const factoryMinScriptFileName = `${scriptName}.factory.min.js`;
    const factoryMinScriptPath = path.join(factoryGeneratedDir, factoryMinScriptFileName).replace(/\\/g,'//');
    const ctorArgumentNames = [];
    populateParameters(info, ctorArgumentNames);
    const ctorArgumentsWithContextNames = utils.getJSONObject(utils.getJSONString(ctorArgumentNames));
    ctorArgumentsWithContextNames.push('contextName');
    let _factoryScriptPath;
    enumerateContext({ typeName }, ({ contextName, contextFilePath, factoryScriptPath }) => {
        contextFilePaths[contextName] = contextFilePath;
        _factoryScriptPath = factoryScriptPath;
    });
    const factoryInfoJson = factoryInfoTemplate
        .replace(/\[TypeName\]/g, typeName)
        .replace(/\[FactoryScriptPath\]/g, _factoryScriptPath)
        .replace(/\[MinFactoryScriptPath\]/g, factoryMinScriptPath)
        .replace(/\[FactoryContainerContextFilePaths\]/g, utils.getJSONString(contextFilePaths))
        .replace(/\[CtorArgumentNames\]/g, utils.getJSONString(ctorArgumentNames))
        .replace(/\[CtorArgumentsWithContextNames\]/g, utils.getJSONString(ctorArgumentsWithContextNames));
    const _factoryInfo = utils.getJSONObject(factoryInfoJson);
    factoryInfo[typeName] = _factoryInfo;
};
writeFileSync(factoryInfoPath, utils.getJSONString(factoryInfo), 'utf8');
