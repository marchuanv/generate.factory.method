const { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } = require('fs');
const path = require('path');
const utils = require('utils');
const libDir = path.join(__dirname, '../lib');
const specsFactoryDir = path.join(__dirname, '../spec', 'factory');
const libFactoryDir = path.join(__dirname, '../lib', 'factory');
const rootScripts = readdirSync(libDir, { withFileTypes: true }).filter(dirent => dirent.isFile() && dirent.name.indexOf('.factory.js') === -1).map(file => path.join(libDir, file.name));
const httpScripts = readdirSync(path.join(libDir, 'http'), { withFileTypes: true }).filter(dirent => dirent.isFile() && dirent.name.indexOf('.factory.js') === -1).map(file => path.join(libDir, 'http', file.name));
const websocketScripts = readdirSync(path.join(libDir, 'websocket'), { withFileTypes: true }).filter(dirent => dirent.isFile() && dirent.name.indexOf('.factory.js') === -1).map(file => path.join(libDir, 'websocket', file.name));
const scripts = rootScripts.concat(httpScripts.concat(websocketScripts));
const factoryTemplate = readFileSync(path.join(__dirname,'factory.template'),'utf8');
const factorySpecTemplate = readFileSync(path.join(__dirname,'factory.spec.template'),'utf8');
const factoryRequireTemplate = readFileSync(path.join(__dirname,'factory.require.template'),'utf8');
const factoryCallCreateTemplate = readFileSync(path.join(__dirname,'factory.call.create.template'),'utf8');
const specVariablesTemplate = readFileSync(path.join(__dirname,'spec.variables.template'),'utf8');
const typeInfoTemplate = readFileSync(path.join(__dirname,'typeinfo.template'),'utf8');
const specVariables = require('./spec.variables.values');

if (!existsSync(specsFactoryDir)){
    mkdirSync(specsFactoryDir);
}
if (!existsSync(libFactoryDir)){
    mkdirSync(libFactoryDir);
}

function getDependencyTree(typeInfo, pass = 'firstpass', types = []) {
    if (!typeInfo || utils.isEmptyObject(typeInfo)) {
        const scriptPath = scripts.find(scPath => types.find(ti => ti.scriptPath === scPath) === undefined);
        if (scriptPath) {
            const scriptName = path.basename(scriptPath).replace(path.extname(scriptPath),'');
            const factoryScriptName = `${scriptName}.factory.js`;
            const specScriptName = `${scriptName}.factory.spec.js`;
            const factoryScriptPath = path.join(libDir, 'factory', factoryScriptName);
            const specScriptPath = path.join(specsFactoryDir, specScriptName);
            const sc = require(scriptPath);
            const key = Object.keys(sc)[0];
            const type = sc[key];
            const children = utils.getFunctionParams(type).map(param => utils.getJSONObject(typeInfoTemplate
                .replace(/\[TypeName\]/g, param.name)
                .replace(/\[ScriptPath\]/g,'')
                .replace(/\[FactoryScriptPath\]/g,'')
                .replace(/\[SpecScriptPath\]/g,'')
                .replace(/\[ChildrenArray\]/g,'')
                .replace(/\[PassesArray\]/g,'')
                .replace(/\[VariableName\]/g, param.name)
                .replace(/\[VariableValue\]/g, '')
            ));
            typeInfo = utils.getJSONObject(typeInfoTemplate
                .replace(/\[TypeName\]/g, type.name)
                .replace(/\[ScriptPath\]/g, scriptPath.replace(/\\/g,'\\\\') )
                .replace(/\[FactoryScriptPath\]/g, factoryScriptPath.replace(/\\/g,'\\\\'))
                .replace(/\[SpecScriptPath\]/g, specScriptPath.replace(/\\/g,'\\\\'))
                .replace(/\[ChildrenArray\]/g, children.map(child => utils.getJSONString(child)).join(','))
                .replace(/\[PassesArray\]/g, [])
                .replace(/\[VariableName\]/g, '')
                .replace(/\[VariableValue\]/g, '')
            );
            types = types.concat(children).concat(typeInfo);
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
            info2.scriptPath &&
            info.scriptPath
        ));
        for(const typeInfo of types) {
            delete typeInfo.passes;
            typeInfo.children = typeInfo.children.map(child => {
                let refChild = types.filter(inf => 
                    inf.typeName.toLowerCase() === child.typeName.toLowerCase() &&
                    inf.scriptPath
                )[0];
                if (refChild) {
                    refChild.variableName = child.variableName;
                    return refChild
                } else {
                    return child;
                }
            });
            for(const child of typeInfo.children.filter(child => !child.scriptPath)) {
                const value = specVariables[child.variableName];
                if (value === undefined) {
                    throw new Error(`the ${child.variableName} value is undefined.`);
                }
                if (isNaN(value)) {
                    if (typeof value === 'object') {
                        child.variableValue = utils.getJSONString(value);
                    } else {
                        child.variableValue = `'${value}'`;
                    }
                } else if (existsSync(value)) {
                    child.variableValue  = require(value);
                } else {
                    child.variableValue = value;
                }
            }
        }
        return types;
    }
    typeInfo.passes.push(pass);
    return getDependencyTree(null, pass, types);
}

function walkDependencyTree(parent, callback, tracks = [], level = 0) {
    for(const child of parent.children) {
        if (!tracks.find(track => track.info.typeName === child.typeName)) {
            tracks.push({ level, info: child });
        }
        walkDependencyTree(child, callback, tracks, level + 1);
    }
    const isRoot = tracks.find(track => track.info.typeName === parent.typeName) === undefined;
    if (isRoot) {
        const orderedTracks = tracks.sort((a, b) => b.level - a.level);
        for(const track of orderedTracks) {
            callback(track.info);
        }
    }
}

for(const info of getDependencyTree()) {
    
    if (!info.scriptPath) {
        continue;
    }

    const factory = factoryTemplate
        .replace(/\[args\]/g, `{ ${info.children.map(x => x.variableName)} }` )
        .replace(/\[scriptpath\]/g, info.scriptPath.replace(/\\/g,'\\\\'))
        .replace(/\[typename\]/g, info.typeName);
    writeFileSync(info.factoryScriptPath, factory, 'utf8');

    //Require Scripts
    const factoryRequireScripts = [];
    walkDependencyTree(info, (typeInfo) => {
        if (typeInfo.scriptPath) {
            factoryRequireScripts.push(factoryRequireTemplate
                .replace(/\[TypeName\]/g, typeInfo.typeName)
                .replace(/\[RequireScriptPath\]/g, typeInfo.factoryScriptPath.replace(/\\/g,'\\\\'))
            );
        }
    });

    factoryRequireScripts.push(factoryRequireTemplate
        .replace(/\[TypeName\]/g, info.typeName)
        .replace(/\[RequireScriptPath\]/g, info.factoryScriptPath.replace(/\\/g,'\\\\'))
    );

    const specArrangeVariables = [];
    walkDependencyTree(info, (typeInfo) => {
        if (typeInfo.scriptPath) {
            specArrangeVariables.push(factoryCallCreateTemplate
                .replace(/\[TypeVariableName\]/g, typeInfo.variableName)
                .replace(/\[TypeName\]/g, typeInfo.typeName)
                .replace(/\[Args\]/g, typeInfo.children.map(c => c.variableName).join(','))
            );
        } else {
            specArrangeVariables.push(specVariablesTemplate
                .replace(/\[VariableName\]/g, typeInfo.variableName)
                .replace(/\[VariableValue\]/g, typeInfo.variableValue)
            );
        }
    });

    const factorySpec = factorySpecTemplate
        .replace(/\[ScriptPath\]/g, info.factoryScriptPath.replace(/\\/g,'\\\\'))
        .replace(/\[TypeName\]/g, info.typeName)
        .replace(/\[Args\]/g, `{ ${info.children.map( x => x.variableName )} }` )
        .replace(/\[FactoryRequireScripts\]/g, factoryRequireScripts.join('\r\n'))
        .replace(/\[SpecArrangeVariables\]/g, specArrangeVariables.join('\r\n'));
    writeFileSync(info.specScriptPath, factorySpec, 'utf8');
}