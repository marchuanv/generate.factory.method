const { readFileSync } = require('fs');
const path = require('path');
const utils = require('utils');
const typeInfoTemplate = readFileSync(path.join(__dirname,'templates', 'type.info.template'),'utf8');

function getTypeInfoTree({ type, isSingleton, unresolvedTypeLibrary }) {
    let parentInfo;
    try {
        const parameters = utils.getFunctionParams(type) || [];
        const childInfoArray = parameters.map(param => utils.getJSONObject(typeInfoTemplate
            .replace(/\[TypeName\]/g, param.name)
            .replace(/\[IsSingleton\]/g, false)
            .replace(/\[ChildInfoArray\]/g,'')
            .replace(/\[IsRef\]/g, false)
            .replace(/\[VariableName\]/g, param.name)
        ));
        if (!childInfoArray || utils.isEmptyObject(childInfoArray)) {
            throw new Error('something went wrong with creating child type information.');
        }
        parentInfo = utils.getJSONObject(typeInfoTemplate
            .replace(/\[TypeName\]/g, type.name)
            .replace(/\[IsSingleton\]/g, isSingleton)
            .replace(/\[IsRef\]/g, true)
            .replace(/\[ChildInfoArray\]/g, childInfoArray.map(child => utils.getJSONString(child)).join(','))
            .replace(/\[VariableName\]/g, `${type.name.split('')[0].toLowerCase()}${type.name.split('').splice(1,999).join('')}`)
        );
        if (!parentInfo || utils.isEmptyObject(parentInfo)) {
            throw new Error('something went wrong with creating type information.');
        }
    } catch (err) {
        throw(err);
    }
    for(const unresolvedChildInfo of parentInfo.childInfoArray.filter(cInf => !cInf.IsResolved)) {
        const unresolvedChildInfoIndex = parentInfo.childInfoArray.findIndex(cInfo => cInfo.typeName.toLowerCase() === unresolvedChildInfo.typeName.toLowerCase());
        const unresolved = unresolvedTypeLibrary.find(info => info.type.name.toLowerCase() === unresolvedChildInfo.typeName.toLowerCase());
        if (unresolved) {
            const { type, isSingleton } = unresolved;
            parentInfo.childInfoArray[unresolvedChildInfoIndex] = getTypeInfoTree({ type, isSingleton, unresolvedTypeLibrary });
        }
    };
    return parentInfo;
}

const resolvedTypeLibrary = [];
const typeLibrary = [];
    
module.exports = {
    add: ({ type, isSingleton }) => {
        typeLibrary.push({ type, isSingleton });
    },
    get: ({ typeName }) => {
        let resolvedTypeInfo = resolvedTypeLibrary.find(rtl => rtl.typeName === typeName);
        if (resolvedTypeInfo) {
            return resolvedTypeInfo;
        }
        const { type, isSingleton } = typeLibrary.find(tl => tl.type.name.toLowerCase() === typeName.toLowerCase());
        resolvedTypeInfo = getTypeInfoTree({ type, isSingleton, unresolvedTypeLibrary: typeLibrary });
        resolvedTypeLibrary.push(resolvedTypeInfo);
        return resolvedTypeInfo;
    }
}
