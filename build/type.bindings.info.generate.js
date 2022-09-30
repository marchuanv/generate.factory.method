const path = require('path');
const { writeFileSync } = require('fs');
const utils = require('utils');
const typeConfig = require(path.join(__dirname, 'type.info.json'));
const typeBindingsConfigPath = path.join(__dirname, 'type.bindings.info.json');
const typeBindingsConfig = require(typeBindingsConfigPath);
const bindingsConfig = require(path.join(__dirname, 'bindings.info.json'));

const bindingsNames = Object.keys(bindingsConfig);
const typeNames = Object.keys(typeConfig);
for(const typeName of typeNames) {
    if (!typeBindingsConfig[typeName]) {
        typeBindingsConfig[typeName] = {};
    }
};
writeFileSync(typeBindingsConfigPath, utils.getJSONString(typeBindingsConfig), 'utf8');
for(const typeName of typeNames) {
    const typeBindingConfig = typeBindingsConfig[typeName];
    for(const bindingName of bindingsNames) {
        if (!typeBindingConfig[bindingName]) {
            typeBindingConfig[bindingName] = utils.getJSONObject(utils.getJSONString(bindingsConfig[bindingName]));
        }
    };
};
writeFileSync(typeBindingsConfigPath, utils.getJSONString(typeBindingsConfig), 'utf8');