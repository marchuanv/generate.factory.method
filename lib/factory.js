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
            module.exports[depConfig.variableName].ctorParams[propName] = depInstance;
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
    const ctorParams = Object.keys(getCtorParameters({ type, isImmediate: true, isReference: false })).reduce((newObj, key) => {
        newObj[key] = null;
        return newObj;
    },{});
    Object.freeze(ctorParams);
    let getCount = 0;
    Object.defineProperty(module.exports, config.variableName, { configurable: true, get : () => {
        let allParamsSet = true;
        getCount = getCount + 1;
        for(const prop in ctorParams) {
            if (!ctorParams[prop]) {
                allParamsSet = false;
            }
        }
        if (getCount > Object.keys(ctorParams).length && !allParamsSet){
            const falseDep = Object.keys(ctorParams).find(key => !ctorParams[key]);
            throw new Error(`unable to resolve ${falseDep} constructor dependency for type: ${config.name}`);
        }
        if (allParamsSet) {
            Object.defineProperty(module.exports, config.variableName, { get : () => {
                return getInstance({ config, otherCtorParams: ctorParams });
            }});
            return { ctorParams }
        } else {
            return { ctorParams }
        }
    }});
}
