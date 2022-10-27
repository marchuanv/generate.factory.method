const { readdirSync, readFileSync, writeFileSync, statSync } = require('fs');

function walk(dir) {
    let results = [];
    const list = readdirSync(dir);
    list.forEach(function(file) {
        const _file = path.join(dir, '/', file);
        const stat = statSync(_file);
        if (stat && stat.isDirectory()) { 
            /* Recurse into a subdirectory */
            results = results.concat(walk(_file));
        } else { 
            /* Is a file */
            results.push(_file);
        }
    });
    return results;
}

const path = require('path');
const utils = require('utils');
const libDir = path.join(__dirname, '../lib');
const prototypeScripts = walk(libDir).filter(scPath => scPath.indexOf('prototype.js') > -1);
const typeInfoTemplate = readFileSync(path.join(__dirname,'templates', 'type.info.template'),'utf8');
const typesInfoPath = path.join(__dirname, 'types.info.json');
const typesInfo = require(typesInfoPath);
const typesMappingInfo = require(path.join(__dirname, 'types.mapping.info.json'));
const typesSingletonInfoFilePath = path.join(__dirname, 'types.singleton.info.json');
const typesSingletonInfo = require(typesSingletonInfoFilePath);

writeFileSync(typesInfoPath, utils.getJSONString({}), 'utf8');

function isSingleton({ typeName }) {
    return typesSingletonInfo[typeName] === undefined ? null : typesSingletonInfo[typeName].isSingleton === undefined ? null : typesSingletonInfo[typeName].isSingleton;
}

function walkDependencyTree(children, callback) {
    for(const child of children) {
        callback(child);
        walkDependencyTree(child.children, callback);
    };
}

function getDependencyTree(info, pass = 'firstpass', types = []) {
    if (!info || utils.isEmptyObject(info)) {
        const prototypeScriptPath = prototypeScripts.find(scPath => types.find(ti => ti.prototypeScriptPath === scPath.replace(/\\/g,'//')) === undefined);
        if (prototypeScriptPath) {
            try {
                const sc = require(prototypeScriptPath);
                const key = Object.keys(sc)[0];
                const type = sc[key];
                const scriptPath = prototypeScriptPath.replace('.prototype','');
                const parameters = utils.getFunctionParams(type) || [];
                const children = parameters.map(param => utils.getJSONObject(typeInfoTemplate
                    .replace(/\[TypeName\]/g, param.name)
                    .replace(/\[ScriptPath\]/g, '')
                    .replace(/\[IsSingleton\]/g, false)
                    .replace(/\[PrototypeScriptPath\]/g,'')
                    .replace(/\[ChildrenArray\]/g,'')
                    .replace(/\[PassesArray\]/g, [])
                    .replace(/\[VariableName\]/g, param.name)
                ));
                if (!children || utils.isEmptyObject(children)) {
                    throw new Error('something went wrong with creating type information dependencies.');
                }
                const _isSingleton = isSingleton({ typeName: type.name });
                info = utils.getJSONObject(typeInfoTemplate
                    .replace(/\[TypeName\]/g, type.name)
                    .replace(/\[ScriptPath\]/g, scriptPath.replace(/\\/g,'//'))
                    .replace(/\[IsSingleton\]/g, _isSingleton)
                    .replace(/\[PrototypeScriptPath\]/g, prototypeScriptPath.replace(/\\/g,'//'))
                    .replace(/\[ChildrenArray\]/g, children.map(child => utils.getJSONString(child)).join(','))
                    .replace(/\[PassesArray\]/g, [])
                    .replace(/\[VariableName\]/g, '')
                );
                if (!info || utils.isEmptyObject(info)) {
                    throw new Error('something went wrong with creating type information.');
                }
                types = types.concat(children).concat(info);
            } catch (err) {
                console.log(`errors loading the ${prototypeScriptPath} script: `, err);
            }
        }
        else {
            info = types.find(inf =>  inf.passes.find(p => p === pass) === undefined);
        }
    }
    if (!info || utils.isEmptyObject(info)) {
        if (pass === 'firstpass') {
            return getDependencyTree(null, 'secondpass', types);
        }
        if (pass === 'secondpass') {
            return getDependencyTree(null, 'thirdpass', types);
        }
      
        types = types.filter(info => types.find(info2 =>
            info2.typeName.toLowerCase() === info.typeName.toLowerCase() && 
            info2.prototypeScriptPath &&
            info.prototypeScriptPath
        ));
        for(const info of types) {
            info.children = info.children.map(child => {
                const mappedKeyIndex = Object.keys(typesMappingInfo).map(key => key.toLowerCase()).findIndex(key => key == child.typeName.toLowerCase());
                const mappedKey = Object.keys(typesMappingInfo)[mappedKeyIndex];
                if (mappedKey) {
                    child.typeName = typesMappingInfo[mappedKey];
                }
                child.isSingleton = isSingleton({ typeName: child.typeName });
                let refChild = types.filter(inf => 
                    inf.typeName.toLowerCase() === child.typeName.toLowerCase() &&
                    inf.prototypeScriptPath
                )[0];
                if (refChild) {
                    refChild.variableName = child.variableName;
                    return refChild
                } else {
                    return child;
                }
            });
        }
        for(const type of types.filter(inf => !inf.variableName)) {
            type.variableName = `${type.typeName.split('')[0].toLowerCase()}${type.typeName.split('').splice(1,999).join('')}`;
        };
        //cleanup
        for(const info of types) {
            for(const child of info.children) {
                delete child.passes;
            };
            delete info.passes;
        };
        return types;
    }
    info.passes.push(pass);
    return getDependencyTree(null, pass, types);
}

const depTree = getDependencyTree();
walkDependencyTree(depTree, (info) => {
    if (info.scriptPath) {
        if (typesSingletonInfo[info.typeName] === undefined) {
            typesSingletonInfo[info.typeName] = {
                isSingleton: false,
                isBindingSingleton: true
            };
        }
    }
});

for(const info of getDependencyTree()) {
    if (!info.prototypeScriptPath) {
        continue;
    }
    typesInfo[info.typeName] = {};
    typesInfo[info.typeName] = utils.getJSONObject(utils.getJSONString(info)); //Clone
};

writeFileSync(typesSingletonInfoFilePath, utils.getJSONString(typesSingletonInfo), 'utf8');
writeFileSync(typesInfoPath, utils.getJSONString(typesInfo), 'utf8');
