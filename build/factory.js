const path = require('path');
const utils = require('utils');
const factoryConfig = require(path.join(__dirname, 'factory.json'));

function Factory() {
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
  
}
module.exports = { Factory };
