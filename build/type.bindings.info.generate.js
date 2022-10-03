const path = require('path');
const { writeFileSync } = require('fs');
const utils = require('utils');
const typesInfo = require(path.join(__dirname, 'types.info.json'));
const typeBindingsInfoPath = path.join(__dirname, 'type.bindings.info.json');
const typeBindingsInfo = require(typeBindingsInfoPath);
const bindingsInfo = require(path.join(__dirname, 'bindings.info.json'));

const typeNames = Object.keys(typesInfo);
const bindingsNames = Object.keys(bindingsInfo);
for(const typeName of typeNames) {
    if (!typeBindingsInfo[typeName]) {
        typeBindingsInfo[typeName] = {};
    }
};
writeFileSync(typeBindingsInfoPath, utils.getJSONString(typeBindingsInfo), 'utf8');
for(const typeName of typeNames) {
    const typeInfo = typesInfo[typeName];
    const typeBindingInfo = typeBindingsInfo[typeName];
    const bindingInfo = bindingsInfo[typeName];
    for(const bindingName of bindingsNames) {
        if (typeBindingInfo[bindingName]) {
            for(const bindingPropName of Object.keys(typeBindingInfo[bindingName])) {
                if (typeof bindingsInfo[bindingName][bindingPropName] === 'object') {
                    
                } else if (typeBindingInfo[bindingName][bindingPropName] !== bindingsInfo[bindingName][bindingPropName]) {
                    typeBindingInfo[bindingName][bindingPropName] = bindingsInfo[bindingName][bindingPropName];
                }
            };
        } else {
            typeBindingInfo[bindingName] = utils.getJSONObject(utils.getJSONString(bindingsInfo[bindingName]));
        }
    };
};
writeFileSync(typeBindingsInfoPath, utils.getJSONString(typeBindingsInfo), 'utf8');