const { readFileSync, writeFileSync, existsSync } = require('fs');
const path = require('path');
const utils = require('utils');
const typeInfoTemplate = readFileSync(path.join(__dirname,'templates', 'type.info.template'),'utf8');

function resolveTypeInfo({ type, isSingleton, typeInfoFilePath }) {
    let parentInfo;
    try {
        const parameters = utils.getFunctionParams(type) || [];
        const childInfoArray = parameters.map(param => utils.getJSONObject(typeInfoTemplate
            .replace(/\[TypeName\]/g, param.name)
            .replace(/\[IsSingleton\]/g, false)
            .replace(/\[ChildInfoArray\]/g,'')
            .replace(/\[IsRef\]/g, false)
            .replace(/\[IsResolved\]/g, false)
            .replace(/\[VariableName\]/g, param.name)
        ));
        if (!childInfoArray || utils.isEmptyObject(childInfoArray)) {
            throw new Error('something went wrong with creating child type information.');
        }
        parentInfo = utils.getJSONObject(typeInfoTemplate
            .replace(/\[TypeName\]/g, type.name)
            .replace(/\[IsSingleton\]/g, isSingleton)
            .replace(/\[IsRef\]/g, true)
            .replace(/\[IsResolved\]/g, true)
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
        const unresolved = typeInfo.find(info => info.type.name.toLowerCase() === unresolvedChildInfo.typeName.toLowerCase());
        if (unresolved) {
            const { type, isSingleton } = unresolved;
            parentInfo.childInfoArray[unresolvedChildInfoIndex] = resolveTypeInfo({ type, isSingleton, typeInfoFilePath });
        }
    };
    let typeInfo = loadTypeInfo({ typeInfoFilePath });
    typeInfo = typeInfo.filter(ti => ti.typeName !== parentInfo.typeName);
    typeInfo.push(parentInfo);
    writeFileSync(typeInfoFilePath, utils.getJSONString(typeInfo), 'utf8');
}

function loadTypeInfo({ typeInfoFilePath }) {
    let typeInfo = [];
    if (existsSync(typeInfoFilePath)) {
        typeInfo = utils.getJSONObject(readFileSync(typeInfoFilePath, 'utf8'));
    }
    return typeInfo;
}

module.exports = {
    add: ({ type, isSingleton, typeInfoOutputDirPath }) => {
        const typeInfoFilePath = path.join(typeInfoOutputDirPath, 'type.info.json');
        const typeInfo = loadTypeInfo({ typeInfoFilePath });
        const typeName = type.name;
        if (!typeInfo.find(tl => tl.typeName === typeName)) {
            typeInfo.push({ typeName, isSingleton });
            writeFileSync(typeInfoFilePath, utils.getJSONString(typeInfo), 'utf8');
        }
    },
    get: ({ type, typeInfoOutputDirPath }) => {
        const typeInfoFilePath = path.join(typeInfoOutputDirPath, 'type.info.json');
        let typeInfo = loadTypeInfo({ typeInfoFilePath });
        const info = typeInfo.find(tl => tl.typeName === type.name);
        const { isSingleton, isResolved } = info;
        if (isResolved) {
            return info;
        } else {
            resolveTypeInfo({ type, isSingleton, typeInfoFilePath });
            return module.exports.get({ type, typeInfoOutputDirPath });
        }
    }
}
