const { readFileSync, writeFileSync, existsSync } = require('fs');
const path = require('path');
const utils = require('utils');
const containerInfoTemplate = readFileSync(path.join(__dirname,'templates', 'container.info.template'),'utf8');

function resolveContainerInfo({ typeName, isContextSingleton, containerFilePath, prototypeScriptPath, typeInfo, containerInfoFilePath, containerInfoOutputDirPath }) {
    let parentContainerInfo;
    let containerInfo = loadContainerInfo({ containerInfoFilePath });
    const info = typeInfo.find(tInfo => tInfo.typeName.toLowerCase() ===  typeName.toLowerCase());
    const { variableName, childTypeInfoArray } = info;
    try {
        const childContainerInfoArray = childTypeInfoArray.map(child => utils.getJSONObject(containerInfoTemplate
            .replace(/\[TypeName\]/g, child.typeName)
            .replace(/\[IsContextSingleton\]/g, true)
            .replace(/\[PrototypeScriptPath\]/g, child.prototypeScriptPath.replace(/\\/g,'//'))
            .replace(/\[ChildContainerInfoArray\]/g, utils.getJSONString([]))
            .replace(/\[ContainerFilePath\]/g, path.join(containerInfoOutputDirPath, `${child.typeName.toLowerCase()}.factory.container.js`).replace(/\\/g,'//'))
            .replace(/\[IsResolved\]/g, false)
            .replace(/\[VariableName\]/g, child.variableName)
        ));
        if (!childContainerInfoArray || utils.isEmptyObject(childContainerInfoArray)) {
            throw new Error('something went wrong with creating child container information.');
        }
        const containerFilePath = path.join(containerInfoOutputDirPath, `${typeName.toLowerCase()}.factory.container.js`).replace(/\\/g,'//');
        parentContainerInfo = utils.getJSONObject(containerInfoTemplate
            .replace(/\[TypeName\]/g, typeName)
            .replace(/\[IsContextSingleton\]/g, isContextSingleton)
            .replace(/\[PrototypeScriptPath\]/g, prototypeScriptPath.replace(/\\/g,'//'))
            .replace(/\[ChildContainerInfoArray\]/g, utils.getJSONString(childContainerInfoArray))
            .replace(/\[ContainerFilePath\]/g, containerFilePath)
            .replace(/\[IsResolved\]/g, false)
            .replace(/\[VariableName\]/g, variableName)
        );
        if (!parentContainerInfo || utils.isEmptyObject(parentContainerInfo)) {
            throw new Error('something went wrong with creating container information.');
        }
    } catch (err) {
        throw(err);
    }
    for(const unresolvedChildContainerInfo of parentContainerInfo.childContainerInfoArray.filter(cInf => !cInf.IsResolved)) {
        const unresolvedChildContainerInfoIndex = parentContainerInfo.childContainerInfoArray.findIndex(cInfo => cInfo.typeName.toLowerCase() === unresolvedChildContainerInfo.typeName.toLowerCase());
        const unresolved = containerInfo.find(cInfo => cInfo.typeName.toLowerCase() === unresolvedChildContainerInfo.typeName.toLowerCase());
        if (unresolved) {
            {
                const { typeName, prototypeScriptPath, isContextSingleton } = unresolved;
                parentContainerInfo.childContainerInfoArray[unresolvedChildContainerInfoIndex] = resolveContainerInfo({ 
                    typeName,
                    isContextSingleton,
                    containerFilePath,
                    prototypeScriptPath,
                    typeInfo,
                    containerInfoFilePath,
                    containerInfoOutputDirPath
                });
            }
        }
    };
    return parentContainerInfo;
}

function loadContainerInfo({ containerInfoFilePath }) {
    let containerInfo = [];
    if (existsSync(containerInfoFilePath)) {
        containerInfo = utils.getJSONObject(readFileSync(containerInfoFilePath, 'utf8'));
    }
    return containerInfo;
}

module.exports = {
    add: ({ prototypeScriptPath, isContextSingleton, containerInfoOutputDirPath }) => {
        const script = require(prototypeScriptPath);
        const typeName = Object.keys(script)[0];
        const containerInfoFilePath = path.join(containerInfoOutputDirPath, 'container.info.json');
        let containerInfo = loadContainerInfo({ containerInfoFilePath });
        const knownContainerInfo = containerInfo.find(tl => tl.typeName === typeName);
        if (knownContainerInfo) {
            knownContainerInfo.isContextSingleton = isContextSingleton;
        } else {
            const containerFilePath = path.join(containerInfoOutputDirPath, `${typeName.toLowerCase()}.factory.container.js`);
            containerInfo.push({
                containerFilePath: containerFilePath.replace(/\\/g,'//'),
                isContextSingleton,
                typeName
            });
        }
        writeFileSync(containerInfoFilePath, utils.getJSONString(containerInfo), 'utf8');
    },
    resolve: ({ prototypeScriptPath, typeInfoFilePath, containerInfoOutputDirPath }) => {
        const script = require(prototypeScriptPath);
        const typeName = Object.keys(script)[0];
        const containerInfoFilePath = path.join(containerInfoOutputDirPath, 'container.info.json');
        let containerInfo = loadContainerInfo({ containerInfoFilePath });
        const knownContainerInfo = containerInfo.find(tl => tl.typeName === typeName);
        const typeInfo = require(typeInfoFilePath);
        const resolvedContainerInfo = resolveContainerInfo({ typeName, isContextSingleton: knownContainerInfo.isContextSingleton, containerFilePath: knownContainerInfo.containerFilePath, prototypeScriptPath, typeInfo, containerInfoFilePath, containerInfoOutputDirPath });
        if (knownContainerInfo && resolvedContainerInfo) {
            if (utils.getJSONString(knownContainerInfo) !== utils.getJSONString(resolvedContainerInfo)) {
                containerInfo = containerInfo.filter(x => x.typeName.toLowerCase() !== typeName.toLowerCase()); //remove the container
                containerInfo.push(resolvedContainerInfo);
                writeFileSync(containerInfoFilePath, utils.getJSONString(containerInfo), 'utf8');
            }
        } else {
            throw new Error('type could not be resolved.');
        }
    },
    get: ({ containerInfoOutputDirPath, prototypeScriptPath }) => {
        const script = require(prototypeScriptPath);
        const typeName = Object.keys(script)[0];
        const containerInfoFilePath = path.join(containerInfoOutputDirPath, 'container.info.json');
        const containerInfo = loadContainerInfo({ containerInfoFilePath });
        return containerInfo.find(t => t.typeName.toLowerCase() === typeName.toLowerCase());
    }
}
