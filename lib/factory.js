const { utimes } = require('fs');
const path = require('path');
const utils = require('utils');
const factoryConfig = require(path.join(__dirname, 'factory.json'));

Object.defineProperty(module.exports, 'getCtorParameters', { writable: false, value: (type) => {
    if (typeof type !== 'function') {
        throw new Error("the 'type' parameter is not of type: Function");
    }
    const config = factoryConfig.find(cnf => cnf.name === type.name);
    const depConfig =  factoryConfig.filter(cnf => config.parameters.find(p => p.toLowerCase() === cnf.name.toLowerCase()));
    const otherParams = config.parameters.filter(p => depConfig.find(depC => depC.name.toLowerCase() === p.toLowerCase()) === undefined);
    const furtherDepParams = {};
    Object.assign(furtherDepParams, otherParams.reduce((obj, name) => {
        obj[name] = null;
        return obj;
    },{}));
    for(const dep of depConfig) {
        const typeInfo = require(dep.script);
        const depType = typeInfo[dep.name];
        Object.assign(furtherDepParams, this.getCtorParameters(depType));
    }
    return furtherDepParams;
}});

Object.defineProperty(module.exports, 'get', { writable: false, value: (type, parameters) => {
    const ctorParams = module.exports.getCtorParameters(type);
    if (!utils.isEmptyObject(ctorParams)) {
        for(const name in params) {
            if (!parameters[name]) {
                isValid = false;
                break;
            }
        }
    }
}});

for(const config of factoryConfig) {
    const typeInfo = require(config.script);
    Object.defineProperty(module.exports, config.variableName, {
        get : function () {
            return typeInfo.instance;
        }
    });
}
   
// if (isValid) {
//     let instance = null;
//     for(const propName in parameters) {
//         if (!parameters[propName]) {
//             throw new Error(`the '${propName}' parameter for ${config.name} requires a value`);
//         }
//     }
//     const depConfig =  factoryConfig.filter(cnf => config.parameters.find(p => p.toLowerCase() === cnf.name.toLowerCase()));
//     const depParams = [];
//     for(const dep of depConfig) {
//         const typeInfo = require(dep.script);
//         const depType = typeInfo[dep.name];
//         let depParameters = this.getCtorParameters(depType);
//         Object.assign(depParameters, parameters);
//         const instance = this.get(depType, depParameters);
//         depParams.push({ name: dep.name, instance });
//     }
//     if (config.deconstruct) {
//         const params = depParams.reduce((obj, param ) => {
//             const name = config.parameters.find(p => p.toLowerCase() === param.name.toLowerCase());
//             obj[name] = param.instance;
//             return obj;
//         },{});
//         Object.assign(params, parameters);
//         instance = new type(params);
//     } else {
//         instance = Reflect.construct(type, depParams);
//     }
//     config.instance = instance;
//     return instance;
// }

