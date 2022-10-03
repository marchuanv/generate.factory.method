const path = require('path');
const { writeFileSync, readFileSync } = require('fs');
const utils = require('utils');
const typesInfo = require(path.join(__dirname, 'types.info.json'));
const typeBindingInfoTemplate = readFileSync(path.join(__dirname, 'templates', 'type.binding.info.template'),'utf8');
const typeBindingInfoPath = path.join(__dirname, 'type.binding.info.json');
const typeBindingInfo = [];
const bindingsInfo = require(path.join(__dirname, 'bindings.info.json'));

for(const typeName of Object.keys(typesInfo)) {
    const typeInfo = typesInfo[typeName];
    const { children } = typeInfo;
    for(const bindingName of Object.keys(bindingsInfo)) {
        const { isSingleton } = bindingsInfo[bindingName];
        const ctorParameterInfo = [];
        children.forEach((child) => {
            const name = child.variableName;
            const typeName =  typesInfo[child.typeName] ? child.typeName : null;
            ctorParameterInfo.push({ name, typeName });
        });
        typeBindingInfo.push(utils.getJSONObject(typeBindingInfoTemplate
            .replace(/\[TypeName\]/g, typeName)
            .replace(/\[BindingName\]/g, bindingName)
            .replace(/\[IsSingleton\]/g, isSingleton)
            .replace(/\[CtorParameterInfo\]/g, utils.getJSONString(ctorParameterInfo))
            .replace(/\[DependantBindings\]/g, utils.getJSONString([]))));
    }
};
for(const _typeBindingInfo of typeBindingInfo) {
    const typeInfo = typesInfo[_typeBindingInfo.typeName];
    const { children } = typeInfo;
    children.forEach(child => {
        const depBinding = utils.getJSONObject(utils.getJSONString(typeBindingInfo.find(info2 => 
            info2.typeName === child.typeName && info2.bindingName === _typeBindingInfo.bindingName
        )));
        if (depBinding) {
            delete depBinding.dependantBindings;
            delete depBinding.isSingleton;
            delete depBinding.ctorParameterInfo;
            _typeBindingInfo.dependantBindings.push(depBinding);
        }
    });
};
writeFileSync(typeBindingInfoPath, utils.getJSONString(typeBindingInfo), 'utf8');
