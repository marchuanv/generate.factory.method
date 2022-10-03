const path = require('path');
const { writeFileSync, readFileSync } = require('fs');
const utils = require('utils');
const typesInfo = require(path.join(__dirname, 'types.info.json'));
const typeBindingInfoTemplate = readFileSync(path.join(__dirname, 'templates', 'type.binding.info.template'),'utf8');
const typeBindingsInfoPath = path.join(__dirname, 'type.bindings.info.json');
const typeBindingsInfo = require(typeBindingsInfoPath);

for(const typeName of Object.keys(typesInfo)) {
    const typeInfo = typesInfo[typeName];
    const { children } = typeInfo;
    const ctorParameterInfo = [];
    children.forEach((child) => {
        const name = child.variableName;
        const typeName =  typesInfo[child.typeName] ? child.typeName : null;
        ctorParameterInfo.push({ name, typeName });
    });
    const foundTypeBinding = typeBindingsInfo.find(bind => bind.typeName === typeName);
    if (foundTypeBinding) {
        foundTypeBinding.ctorParameterInfo = ctorParameterInfo;
        if (foundTypeBinding.isSingleton === null || foundTypeBinding.isSingleton === undefined) {
            foundTypeBinding.isSingleton = false;
        }
    } else {
        typeBindingsInfo.push(utils.getJSONObject(typeBindingInfoTemplate
            .replace(/\[TypeName\]/g, typeName)
            .replace(/\[BindingNames\]/g, '[]')
            .replace(/\[IsSingleton\]/g, false)
            .replace(/\[CtorParameterInfo\]/g, utils.getJSONString(ctorParameterInfo))
            .replace(/\[DependantBindings\]/g, utils.getJSONString([]))));
    }
};
writeFileSync(typeBindingsInfoPath, utils.getJSONString(typeBindingsInfo), 'utf8');
