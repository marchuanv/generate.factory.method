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
    let parameters = [];
    const requiredParameters = { };
    for(const dep of depConfig) {
        const params = config.parameters.filter(p => p.toLowerCase() !== dep.name.toLowerCase());
        parameters = params.concat(parameters);
    }
    for(const param of parameters) {
        requiredParameters[param] = null;
    }
    return requiredParameters;
}});
Object.defineProperty(module.exports, 'get', { writable: false, value: (type, parameters) => {
    if (typeof type !== 'function') {
        throw new Error("the 'type' parameter is not of type: Function");
    }
    const params = this.getCtorParameters(type);
    const expectedKeys = Object.keys(params);
    const actualKeys = Object.keys(parameters);
    if (utils.getJSONString(expectedKeys) === utils.getJSONString(actualKeys)) {
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
            const depParameters =  this.getCtorParameters(depType);
            if (depParameters.length > 0) {

            }
            const resolvedDep = this.get(depType, depParameters);
        }
    } else {
        throw new Error('parameters dont match up');
    }
}});
