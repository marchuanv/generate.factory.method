const { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } = require('fs');
const path = require('path');
const utils = require('utils');
const libDir = path.join(__dirname, '../lib');
const generatedFactorySpecsDir = path.join(__dirname, '../spec', 'factory', 'generated');
const generatedFactoryScriptsDir = path.join(__dirname, '../lib', 'factory', 'generated');
const rootScripts = readdirSync(libDir, { withFileTypes: true }).filter(dirent => dirent.isFile()).map(file => path.join(libDir, file.name));
const httpScripts = readdirSync(path.join(libDir, 'http'), { withFileTypes: true }).filter(dirent => dirent.isFile()).map(file => path.join(libDir, 'http', file.name));
const websocketScripts = readdirSync(path.join(libDir, 'websocket'), { withFileTypes: true }).filter(dirent => dirent.isFile()).map(file => path.join(libDir, 'websocket', file.name));
const scripts = rootScripts.concat(httpScripts.concat(websocketScripts)).filter(scPath => scPath.indexOf('prototype.js') > -1);
const typeInfoTemplate = readFileSync(path.join(__dirname,'typeinfo.template'),'utf8');
const typeConfigPath = path.join(__dirname, 'type.config.json');
const typeConfig = require(typeConfigPath);

if (!existsSync(generatedFactorySpecsDir)){
    mkdirSync(generatedFactorySpecsDir);
}
if (!existsSync(generatedFactoryScriptsDir)){
    mkdirSync(generatedFactoryScriptsDir);
}
function getDependencyTree(typeInfo, pass = 'firstpass', types = []) {
    if (!typeInfo || utils.isEmptyObject(typeInfo)) {
        const prototypePath = scripts.find(scPath => types.find(ti => ti.prototypePath === scPath.replace(/\\/g,'//')) === undefined);
        if (prototypePath) {
            try {
                const sc = require(prototypePath);
                const key = Object.keys(sc)[0];
                const type = sc[key];
                const typeName = type.name.toLowerCase();
                const factoryContainerJsonFileDir = path.join(generatedFactoryScriptsDir, typeName);
                const factoryContainerBindingJsonFileDir = path.join(generatedFactoryScriptsDir, typeName);
                const factoryScriptDir = path.join(generatedFactoryScriptsDir, typeName);
                
                if (!existsSync(factoryContainerJsonFileDir)){
                    mkdirSync(factoryContainerJsonFileDir);
                }
                if (!existsSync(factoryContainerBindingJsonFileDir)){
                    mkdirSync(factoryContainerBindingJsonFileDir);
                }
                if (!existsSync(factoryScriptDir)){
                    mkdirSync(factoryScriptDir);
                }

                const scriptName = type.name.toLowerCase();
                const factoryContainerJsonFileName = `${scriptName}.factory.container.json`;
                const factoryContainerBindingJsonFileName = `${scriptName}.factory.container.global.binding.json`;
                const factoryScriptName = `${scriptName}.factory.js`;
                const minFactoryScriptName = `${scriptName}.factory.min.js`;
                const specScriptName = `${scriptName}.factory.spec.js`;

                const factoryContainerFilePath = path.join(factoryContainerJsonFileDir, factoryContainerJsonFileName);
                const factoryContainerBindingFilePath = path.join(factoryContainerBindingJsonFileDir, factoryContainerBindingJsonFileName);
                const factoryScriptPath = path.join(factoryScriptDir, factoryScriptName);
                const minFactoryScriptPath = path.join(factoryScriptDir, minFactoryScriptName);
                const specScriptPath = path.join(generatedFactorySpecsDir, specScriptName);

                const parameters = utils.getFunctionParams(type) || [];
                const children = parameters.map(param => utils.getJSONObject(typeInfoTemplate
                    .replace(/\[TypeName\]/g, param.name)
                    .replace(/\[PrototypePath\]/g,'')
                    .replace(/\[FactoryContainerFilePath\]/g,'')
                    .replace(/\[FactoryContainerBindingFilePath\]/g,'')
                    .replace(/\[FactoryScriptPath\]/g,'')
                    .replace(/\[MinFactoryScriptPath\]/g,'')
                    .replace(/\[SpecScriptPath\]/g,'')
                    .replace(/\[ChildrenArray\]/g,'')
                    .replace(/\[PassesArray\]/g, [])
                    .replace(/\[VariableName\]/g, param.name)
                ));
                if (!children || utils.isEmptyObject(children)) {
                    throw new Error('something went wrong with creating type information dependencies.');
                }
                typeInfo = utils.getJSONObject(typeInfoTemplate
                    .replace(/\[TypeName\]/g, type.name)
                    .replace(/\[PrototypePath\]/g, prototypePath.replace(/\\/g,'//') )
                    .replace(/\[FactoryContainerFilePath\]/g, factoryContainerFilePath.replace(/\\/g,'//') )
                    .replace(/\[FactoryContainerBindingFilePath\]/g, factoryContainerBindingFilePath.replace(/\\/g,'//') )
                    .replace(/\[FactoryScriptPath\]/g, factoryScriptPath.replace(/\\/g,'//'))
                    .replace(/\[MinFactoryScriptPath\]/g, minFactoryScriptPath.replace(/\\/g,'//'))
                    .replace(/\[SpecScriptPath\]/g, specScriptPath.replace(/\\/g,'//'))
                    .replace(/\[ChildrenArray\]/g, children.map(child => utils.getJSONString(child)).join(','))
                    .replace(/\[PassesArray\]/g, [])
                    .replace(/\[VariableName\]/g, '')
                );
                if (!typeInfo || utils.isEmptyObject(typeInfo)) {
                    throw new Error('something went wrong with creating type information.');
                }
                types = types.concat(children).concat(typeInfo);
            } catch (err) {
                console.log(`errors loading the ${prototypePath} script: `, err);
            }
        }
        else {
            typeInfo = types.find(inf =>  inf.passes.find(p => p === pass) === undefined);
        }
    }
    if (!typeInfo || utils.isEmptyObject(typeInfo)) {
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
        for(const typeInfo of types) {
            typeInfo.children = typeInfo.children.map(child => {
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
        for(const typeInfo of types) {
            for(const child of typeInfo.children) {
                delete child.passes;
            };
            delete typeInfo.passes;
        };
        return types;
    }
    typeInfo.passes.push(pass);
    return getDependencyTree(null, pass, types);
}
function walkDependencyTree(parent, callback) {
    let _break = false;
    for(const child of parent.children) {
        callback(child, () => {
            _break = true;
        });
        if (!_break) {
            walkDependencyTree(child, callback);
        }
    }
}
const allTypeInfo = getDependencyTree();
for(const info of allTypeInfo) {
    if (!info.prototypePath) {
        continue;
    }
    typeConfig[info.typeName] = {};
    typeConfig[info.typeName] = utils.getJSONObject(utils.getJSONString(info)); //Clone
};
writeFileSync(typeConfigPath, utils.getJSONString(typeConfig), 'utf8');
