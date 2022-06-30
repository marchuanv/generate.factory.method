const path = require('path');
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

function getInstance({ config, ctorParams }) {
    const depConfigArray = factoryConfig.filter(cnf => config.parameters.find(p => p.name.toLowerCase() === cnf.variableName) !== undefined);
    const typeInfo = require(config.script);
    const type = typeInfo[Object.keys(typeInfo)[0]];
    for(const depConfig of depConfigArray) {
        const depInstance = getInstance({ config: depConfig, ctorParams });
        if (depInstance) {
            const propName = Object.keys(ctorParams).find(key => key.toLowerCase() === depConfig.variableName);
            ctorParams[propName] = depInstance;
            module.exports[depConfig.variableName].ctorParams[propName] = depInstance;

        }
        const depCtorParamName = Object.keys(ctorParams).find(key => key.toLowerCase() === depConfig.variableName);
        if (module.exports[depConfig.variableName].ctorParams) {
            for(const prop in ctorParams) {
                if (prop !== depCtorParamName) {
                    if (ctorParams[prop]) {
                        module.exports[depConfig.variableName].ctorParams[prop] = ctorParams[prop];
                    }
                }
            }
        }
    }
    if (config.deconstruct) {
        return new type(ctorParams);
    } else {
        return Reflect.construct(type, ctorParams);
    }
};

for(const config of factoryConfig) {
    const scriptTypes = require(config.script);
    const type = scriptTypes[Object.keys(scriptTypes)[0]];
    const ctorParams = Object.keys(getCtorParameters({ type, isImmediate: true, isReference: false })).reduce((newObj, key) => {
        newObj[key] = null;
        return newObj;
    },{});
    let getCount = 0;
    Object.defineProperty(module.exports, config.variableName, { configurable: true, get : () => {
        let allParamsSet = true;
        getCount = getCount + 1;
        for(const prop in ctorParams) {
            if (!ctorParams[prop]) {
                allParamsSet = false;
            }
        }
        if (Object.keys(ctorParams).length > getCount && !allParamsSet){
            const falseRef = Object.keys(ctorParams).find(key => !ctorParams[key]);
            throw new Error(`unable to resolve ${falseRef} constructor dependency for type: ${config.name}`);
        }
        if (allParamsSet) {
            const ctorParamsCopy = ctorParams;
            Object.defineProperty(module.exports, config.variableName, { get : () => {
                const ctorParams = getCtorParameters({ type, isImmediate: false, isReference: false });
                Object.assign(ctorParams, ctorParamsCopy);
                return getInstance({ config, ctorParams })
            }});
            return { ctorParams }
        } else {
            return { ctorParams }
        }
    }});
}
