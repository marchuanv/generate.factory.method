const path = require('path');
const utils = require('utils');
const factoryConfig = require(path.join(__dirname, 'factory.json'));

function getCtorParameters({ type, isImmediate, isReference }) {
    const ctorParams = {};
    if (typeof type !== 'function') {
        throw new Error("the 'type' parameter is not of type: Function");
    }
    const config = factoryConfig.find(cnf => cnf.name === type.name);
    Object.assign(ctorParams, config.parameters.reduce((obj, param) => {
        if (param.reference === isReference) {
            obj[param.name] = null;
        }
        return obj;
    },{}));
    if (!isImmediate){
        for(const dep of factoryConfig.filter(cnf => config.parameters.find(p => p.name.toLowerCase() === cnf.variableName))) {
            const typeInfo = require(dep.script);
            const depType = typeInfo[dep.name];
            Object.assign(ctorParams, getCtorParameters({ type: depType, isImmediate, isReference }));
        }
    }
    return ctorParams;
};

function getInstance({ config, otherCtorParams }) {
    const depConfigArray = factoryConfig.filter(cnf => config.parameters.find(p => p.name.toLowerCase() === cnf.variableName) !== undefined);
    const typeInfo = require(config.script);
    const type = typeInfo[Object.keys(typeInfo)[0]];
    const ctorParams = getCtorParameters({ type, isImmediate: true, isReference: true });
    Object.assign(ctorParams, otherCtorParams);
    for(const depConfig of depConfigArray) {
        const depInstance = getInstance({ config: depConfig, otherCtorParams: ctorParams });
        if (depInstance) {
            const propName = Object.keys(ctorParams).find(key => key.toLowerCase() === depConfig.variableName);
            ctorParams[propName] = depInstance;
        }
    }
    if (config.deconstruct) {
        if (!utils.isEmptyObject(ctorParams)){
            return new type(ctorParams);
        }
    } else if (config.parameters.length > 0) {
        const ctorParamArray = Object.keys(ctorParams).map(key => {
            const value = ctorParams[key];
            return value;
        });
        return Reflect.construct(type, ctorParamArray);
    } else {
        return new type();
    }
};

for(const config of factoryConfig) {
    const scriptTypes = require(config.script);
    const type = scriptTypes[Object.keys(scriptTypes)[0]];
    const ctorParams = getCtorParameters({ type, isImmediate: false, isReference: false });
    const ctorParamsTemplate = getCtorParameters({ type, isImmediate: false, isReference: false });
    Object.defineProperty(module.exports, config.variableName, { get : () => {
        const ctorParamKeys = Object.keys(ctorParams);
        const ctorParamsTemplateKeys = Object.keys(ctorParamsTemplate);
        const hasAllKeys = ctorParamKeys.filter(key => ctorParamsTemplateKeys.find(key2 => key2 === key)).filter(key => ctorParams[key]).length > 1;
        const invalidKey = ctorParamKeys.find(key => ctorParamsTemplateKeys.filter(key2 => key2 === key).length === 0);
        if (invalidKey) {
            throw new Error(`${config.name} does not have a ${invalidKey} constructor parameter.`);
        }
        if (hasAllKeys) {
            return getInstance({ config, otherCtorParams: ctorParams });
        }
        return ctorParams;
    }});
}
