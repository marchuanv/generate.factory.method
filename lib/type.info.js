const { readFileSync, writeFileSync, existsSync } = require('fs');
const path = require('path');
const utils = require('utils');
const typeInfoTemplate = readFileSync(path.join(__dirname,'templates', 'type.info.template'),'utf8');

function resolveTypeInfo({ prototypeScriptPath, isSingleton, typeInfoFilePath }) {
    let parentInfo;
    try {
        const script = require(prototypeScriptPath);
        const typeName = Object.keys(script)[0];
        const type = script[typeName];
        const parameters = utils.getFunctionParams(type) || [];
        const childInfoArray = parameters.map(param => utils.getJSONObject(typeInfoTemplate
            .replace(/\[TypeName\]/g, param.name)
            .replace(/\[IsSingleton\]/g, false)
            .replace(/\[ChildInfoArray\]/g,'')
            .replace(/\[PrototypeScriptPath\]/g, '')
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
            .replace(/\[PrototypeScriptPath\]/g, prototypeScriptPath.replace(/\\/g,'//'))
            .replace(/\[VariableName\]/g, `${type.name.split('')[0].toLowerCase()}${type.name.split('').splice(1,999).join('')}`)
        );
        if (!parentInfo || utils.isEmptyObject(parentInfo)) {
            throw new Error('something went wrong with creating type information.');
        }
    } catch (err) {
        throw(err);
    }
    let typeInfo = loadTypeInfo({ typeInfoFilePath });
    for(const unresolvedChildInfo of parentInfo.childInfoArray.filter(cInf => !cInf.IsResolved)) {
        const unresolvedChildInfoIndex = parentInfo.childInfoArray.findIndex(cInfo => cInfo.typeName.toLowerCase() === unresolvedChildInfo.typeName.toLowerCase());
        const unresolved = typeInfo.find(info => info.typeName.toLowerCase() === unresolvedChildInfo.typeName.toLowerCase());
        if (unresolved) {
            {
                const { prototypeScriptPath, isSingleton } = unresolved;
                parentInfo.childInfoArray[unresolvedChildInfoIndex] = resolveTypeInfo({ prototypeScriptPath, isSingleton, typeInfoFilePath });
            }
        }
    };
    return parentInfo;
}

function loadTypeInfo({ typeInfoFilePath }) {
    let typeInfo = [];
    if (existsSync(typeInfoFilePath)) {
        typeInfo = utils.getJSONObject(readFileSync(typeInfoFilePath, 'utf8'));
    }
    return typeInfo;
}

module.exports = {
    add: ({ prototypeScriptPath, isSingleton, typeInfoOutputDirPath }) => {
        const script = require(prototypeScriptPath);
        const typeInfoFilePath = path.join(typeInfoOutputDirPath, 'type.info.json');
        const typeInfo = loadTypeInfo({ typeInfoFilePath });
        const typeName = Object.keys(script)[0];
        if (!typeInfo.find(tl => tl.typeName === typeName)) {
            typeInfo.push({ prototypeScriptPath, typeName, isSingleton });
            writeFileSync(typeInfoFilePath, utils.getJSONString(typeInfo), 'utf8');
        }
    },
    resolve: ({ prototypeScriptPath, typeInfoOutputDirPath }) => {

        const script = require(prototypeScriptPath);
        const typeName = Object.keys(script)[0];

        const typeInfoFilePath = path.join(typeInfoOutputDirPath, 'type.info.json');
        let typeInfo = loadTypeInfo({ typeInfoFilePath });
        const knownTypeInfo = typeInfo.find(tl => tl.typeName === typeName);
        const { isSingleton } = knownTypeInfo || {};
        const resolvedTypeInfo = resolveTypeInfo({ prototypeScriptPath, isSingleton, typeInfoFilePath });
        if (knownTypeInfo && resolvedTypeInfo) {
            if (utils.getJSONString(knownTypeInfo) !== utils.getJSONString(resolvedTypeInfo)) {
                typeInfo = typeInfo.filter(x => x.typeName.toLowerCase() !== typeName.toLowerCase()); //remove the type
                typeInfo.push(resolvedTypeInfo);
                writeFileSync(typeInfoFilePath, utils.getJSONString(typeInfo), 'utf8');
            }
        } else if (!knownTypeInfo && resolvedTypeInfo) {
            typeInfo.push(resolvedTypeInfo);
            writeFileSync(typeInfoFilePath, utils.getJSONString(typeInfo), 'utf8');
        } else {
            throw new Error('type could not be resolved.');
        }
    }
}
