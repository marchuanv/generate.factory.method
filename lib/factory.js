const { utimes } = require('fs');
const path = require('path');
const utils = require('utils');
const factoryConfig = require(path.join(__dirname, 'factory.json'));


function getCtorParameters({ type, isImmediate }) {
    const ctorParams = {};
    if (typeof type !== 'function') {
        throw new Error("the 'type' parameter is not of type: Function");
    }
    const config = factoryConfig.find(cnf => cnf.name === type.name);
    Object.assign(ctorParams, config.parameters.reduce((obj, name) => {
        obj[name] = null;
        return obj;
    },{}));
    if (!isImmediate){
        for(const dep of factoryConfig.filter(cnf => config.parameters.find(p => p.toLowerCase() === cnf.variableName))) {
            const typeInfo = require(dep.script);
            const depType = typeInfo[dep.name];
            Object.assign(ctorParams, getCtorParameters({ type: depType, isImmediate }));
        }
    }
    return ctorParams;
};


function getInstance({ config, ctorParams }) {
    const depConfigArray = factoryConfig.filter(cnf => config.parameters.find(p => p.toLowerCase() === cnf.variableName) !== undefined);
    const typeInfo = require(config.script);
    const type = typeInfo[Object.keys(typeInfo)[0]];
    for(const depConfig of depConfigArray) {
        const depInstance = getInstance({ config: depConfig, ctorParams });
        if (depInstance) {
            const propName = Object.keys(ctorParams).find(p => p.toLowerCase() === depConfig.variableName);
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
      
        //module.exports[depConfig.variableName].ctorParams[depCtorParamName]
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
    const depConfigArray =  factoryConfig.filter(cnf => config.parameters.find(p => p.toLowerCase() === cnf.name.toLowerCase()));
    const ctorParams = getCtorParameters({ type, isImmediate: false });
    const immediateCtorParams = Object.keys(getCtorParameters({ type, isImmediate: true })).reduce((newObj, key) => {
        if (depConfigArray.find(dc => dc.variableName === key.toLowerCase())) {
            return newObj;
        }
        newObj[key] = null;
        return newObj;
    },{});
    Object.defineProperty(module.exports, config.variableName, { configurable: true, get : () => {
        let allParamsSet = true;
        for(const prop in immediateCtorParams) {
            if (Object.keys(ctorParams).find(icp => icp === prop) && !ctorParams[prop]) {
                allParamsSet = false;
            }
        }
        if (allParamsSet) {
            Object.defineProperty(module.exports, config.variableName, { get : () => {
              return getInstance({ config, ctorParams })
            }});
            return { ctorParams }
        } else {
            return { ctorParams }
        }
    }});
}



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

