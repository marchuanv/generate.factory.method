const { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } = require('fs');
const path = require('path');
const utils = require('utils');
const libDir = path.join(__dirname, '../lib');
const rootScripts = readdirSync(libDir, { withFileTypes: true }).filter(dirent => dirent.isFile()).map(file => path.join(libDir, file.name));
const httpScripts = readdirSync(path.join(libDir, 'http'), { withFileTypes: true }).filter(dirent => dirent.isFile()).map(file => path.join(libDir, 'http', file.name));
const websocketScripts = readdirSync(path.join(libDir, 'websocket'), { withFileTypes: true }).filter(dirent => dirent.isFile()).map(file => path.join(libDir, 'websocket', file.name));
const scripts = rootScripts.concat(httpScripts.concat(websocketScripts)).filter(scPath => scPath.indexOf('prototype.js') > -1);
const typeInfoTemplate = readFileSync(path.join(__dirname,'type.info.template'),'utf8');
const typeInfoPath = path.join(__dirname, 'type.info.json');
const typeInfo = require(typeInfoPath);

function getDependencyTree(info, pass = 'firstpass', types = []) {
    if (!info || utils.isEmptyObject(info)) {
        const prototypePath = scripts.find(scPath => types.find(ti => ti.prototypePath === scPath.replace(/\\/g,'//')) === undefined);
        if (prototypePath) {
            try {
                const sc = require(prototypePath);
                const key = Object.keys(sc)[0];
                const type = sc[key];

                const parameters = utils.getFunctionParams(type) || [];
                const children = parameters.map(param => utils.getJSONObject(typeInfoTemplate
                    .replace(/\[TypeName\]/g, param.name)
                    .replace(/\[PrototypePath\]/g,'')
                    .replace(/\[ChildrenArray\]/g,'')
                    .replace(/\[PassesArray\]/g, [])
                    .replace(/\[VariableName\]/g, param.name)
                ));
                if (!children || utils.isEmptyObject(children)) {
                    throw new Error('something went wrong with creating type information dependencies.');
                }
                info = utils.getJSONObject(typeInfoTemplate
                    .replace(/\[TypeName\]/g, type.name)
                    .replace(/\[PrototypePath\]/g, prototypePath.replace(/\\/g,'//') )
                    .replace(/\[ChildrenArray\]/g, children.map(child => utils.getJSONString(child)).join(','))
                    .replace(/\[PassesArray\]/g, [])
                    .replace(/\[VariableName\]/g, '')
                );
                if (!info || utils.isEmptyObject(info)) {
                    throw new Error('something went wrong with creating type information.');
                }
                types = types.concat(children).concat(info);
            } catch (err) {
                console.log(`errors loading the ${prototypePath} script: `, err);
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
            info2.prototypePath &&
            info.prototypePath
        ));
        for(const info of types) {
            info.children = info.children.map(child => {
                let refChild = types.filter(inf => 
                    inf.typeName.toLowerCase() === child.typeName.toLowerCase() &&
                    inf.prototypePath
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
for(const info of getDependencyTree()) {
    if (!info.prototypePath) {
        continue;
    }
    typeInfo[info.typeName] = {};
    typeInfo[info.typeName] = utils.getJSONObject(utils.getJSONString(info)); //Clone
};
writeFileSync(typeInfoPath, utils.getJSONString(typeInfo), 'utf8');
