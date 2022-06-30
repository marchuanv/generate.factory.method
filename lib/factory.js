const { utimes } = require('fs');
const path = require('path');
const utils = require('utils');
const factoryConfig = require(path.join(__dirname, '..//factory.json'));
Object.defineProperty(module.exports, 'getCtorParameters', { writable: false, value: (type) => {
    if (typeof type !== 'function') {
        throw new Error("the 'type' parameter is not of type: Function");
    }
    const config = factoryConfig.find(cnf => cnf.name === type.name);
    const depConfig =  factoryConfig.filter(cnf => config.parameters.find(p => p.toLowerCase() === cnf.name.toLowerCase()));
    const furtherDepParams = {};
    for(const dep of depConfig) {
        const params = config.parameters.filter(p => p.toLowerCase() !== dep.name.toLowerCase());
        Object.assign(furtherDepParams, params.reduce((obj, name) => {
            obj[name] = null;
            return obj;
        },{}));
        const typeInfo = require(dep.script);
        const depType = typeInfo[dep.name];
        Object.assign(furtherDepParams, this.getCtorParameters(depType));
    }
    return furtherDepParams;
}});
Object.defineProperty(module.exports, 'get', { writable: false, value: (type, parameters) => {
    if (typeof type !== 'function') {
        throw new Error("the 'type' parameter is not of type: Function");
    }
    const params = this.getCtorParameters(type);
    let isValid = false;
    if (utils.isEmptyObject(params)) {
        isValid = true;
    } else {
        for(const name in params) {
            if (!parameters[name]) {
                isValid = false;
                break;
            }
        }
    }
    if (isValid) {
        const config = factoryConfig.find(cnf => cnf.name === type.name);
        for(const propName in parameters) {
            if (!parameters[propName]) {
                throw new Error(`the '${propName}' parameter for ${config.name} requires a value`);
            }
        }
        const depConfig =  factoryConfig.filter(cnf => config.parameters.find(p => p.toLowerCase() === cnf.name.toLowerCase()));
        for(const dep of depConfig) {
            const typeInfo = require(dep.script);
            const depType = typeInfo[dep.name];
            let depParameters = this.getCtorParameters(depType);
            Object.assign(depParameters, parameters);
            const resolvedDep = this.get(depType, depParameters);
        }
    } else {
        throw new Error('parameters values are null or they dont match ctor template');
    }
}});
