const { readFileSync, writeFileSync, existsSync } = require('fs');
const path = require('path');
const utils = require('utils');
const typeInfoTemplate = readFileSync(path.join(__dirname,'templates', 'type.info.template'),'utf8');

function resolveTypeInfo({ typeName, typeInfoFilePath }) {
    let parentInfo;
    let typeInfo = loadTypeInfo({ typeInfoFilePath });
    const { scriptPath, prototypeScriptPath, isSingleton, isContextSingleton } = typeInfo.find(ti => ti.typeName === typeName);
    try {
        const script = require(prototypeScriptPath);
        const typeName = Object.keys(script)[0];
        const type = script[typeName];
        const parameters = utils.getFunctionParams(type) || [];
        const childInfoArray = parameters.map(param => utils.getJSONObject(typeInfoTemplate
            .replace(/\[TypeName\]/g, param.name)
            .replace(/\[IsSingleton\]/g, false)
            .replace(/\[IsContextSingleton\]/g, false)
            .replace(/\[ChildInfoArray\]/g,'')
            .replace(/\[PrototypeScriptPath\]/g, '')
            .replace(/\[ScriptPath\]/g, '')
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
            .replace(/\[IsContextSingleton\]/g, isContextSingleton)
            .replace(/\[IsRef\]/g, true)
            .replace(/\[IsResolved\]/g, true)
            .replace(/\[ChildInfoArray\]/g, childInfoArray.map(child => utils.getJSONString(child)).join(','))
            .replace(/\[PrototypeScriptPath\]/g, prototypeScriptPath.replace(/\\/g,'//'))
            .replace(/\[ScriptPath\]/g, scriptPath.replace(/\\/g,'//'))
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
        const unresolved = typeInfo.find(info => info.typeName.toLowerCase() === unresolvedChildInfo.typeName.toLowerCase());
        if (unresolved) {
            {
                const { typeName } = unresolved;
                parentInfo.childInfoArray[unresolvedChildInfoIndex] = resolveTypeInfo({ typeName, typeInfoFilePath });
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
    add: ({ scriptPath, prototypeScriptPath, isContextSingleton, isSingleton, typeInfoOutputDirPath }) => {
        const script = require(prototypeScriptPath);
        const typeInfoFilePath = path.join(typeInfoOutputDirPath, 'type.info.json');
        let typeInfo = loadTypeInfo({ typeInfoFilePath });
        const typeName = Object.keys(script)[0];
        const knownTypeInfo = typeInfo.find(tl => tl.typeName === typeName);
        if (knownTypeInfo) {
            knownTypeInfo.prototypeScriptPath = prototypeScriptPath.replace(/\\/g,'//');
            knownTypeInfo.scriptPath = scriptPath.replace(/\\/g,'//');
            knownTypeInfo.isContextSingleton = isContextSingleton;
            knownTypeInfo.isSingleton = isSingleton;
        } else {
            typeInfo.push({ scriptPath: scriptPath.replace(/\\/g,'//'), prototypeScriptPath: prototypeScriptPath.replace(/\\/g,'//'), isContextSingleton, typeName, isSingleton });
        }
        writeFileSync(typeInfoFilePath, utils.getJSONString(typeInfo), 'utf8');
    },
    resolve: ({ prototypeScriptPath, typeInfoOutputDirPath }) => {
        const script = require(prototypeScriptPath);
        const typeName = Object.keys(script)[0];
        const typeInfoFilePath = path.join(typeInfoOutputDirPath, 'type.info.json');
        let typeInfo = loadTypeInfo({ typeInfoFilePath });
        const knownTypeInfo = typeInfo.find(tl => tl.typeName === typeName);
        const resolvedTypeInfo = resolveTypeInfo({ typeName, typeInfoFilePath });
        if (knownTypeInfo && resolvedTypeInfo) {
            if (utils.getJSONString(knownTypeInfo) !== utils.getJSONString(resolvedTypeInfo)) {
                typeInfo = typeInfo.filter(x => x.typeName.toLowerCase() !== typeName.toLowerCase()); //remove the type
                typeInfo.push(resolvedTypeInfo);
                writeFileSync(typeInfoFilePath, utils.getJSONString(typeInfo), 'utf8');
            }
        } else {
            throw new Error('type could not be resolved.');
        }
    }
}
