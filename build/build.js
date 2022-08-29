const { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } = require('fs');
const path = require('path');
const utils = require('utils');
const libDir = path.join(__dirname, '../lib');
const specsFactoryDir = path.join(__dirname, '../spec', 'factory');
const libFactoryDir = path.join(__dirname, '../lib', 'factory');
const rootScripts = readdirSync(libDir, { withFileTypes: true }).filter(dirent => dirent.isFile() && dirent.name.indexOf('.factory.js') === -1).map(file => path.join(libDir, file.name));
const httpScripts = readdirSync(path.join(libDir, 'http'), { withFileTypes: true }).filter(dirent => dirent.isFile() && dirent.name.indexOf('.factory.js') === -1).map(file => path.join(libDir, 'http', file.name));
const websocketScripts = readdirSync(path.join(libDir, 'websocket'), { withFileTypes: true }).filter(dirent => dirent.isFile() && dirent.name.indexOf('.factory.js') === -1).map(file => path.join(libDir, 'websocket', file.name));
const scripts = rootScripts.concat(httpScripts.concat(websocketScripts)).filter(scPath => scPath.indexOf('factory.js') === -1);
const factoryTemplate = readFileSync(path.join(__dirname,'factory.template'),'utf8');
const factorySpecTemplate = readFileSync(path.join(__dirname,'factory.spec.template'),'utf8');
const factoryRequireTemplate = readFileSync(path.join(__dirname,'factory.require.template'),'utf8');
const factoryCallCreateTemplate = readFileSync(path.join(__dirname,'factory.call.create.template'),'utf8');
const specVariablesTemplate = readFileSync(path.join(__dirname,'spec.variables.template'),'utf8');
const typeInfoTemplate = readFileSync(path.join(__dirname,'typeinfo.template'),'utf8');
const singletonConfig = require(path.join(__dirname,'singletons.json'),'utf8');

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
            const specVariablesPath =  path.join(specsFactoryDir, `${scriptName}.factory.spec.variables.json`);
            try {
                const sc = require(scriptPath);
                const key = Object.keys(sc)[0];
                const type = sc[key];
                const singleton = singletonConfig.find(cConf => cConf.typeName.toLowerCase() === key.toLowerCase() && cConf.singleton) ? true : false;
                const parameters = utils.getFunctionParams(type) || [];
                const children = parameters.map(param => utils.getJSONObject(typeInfoTemplate
                    .replace(/\[TypeName\]/g, param.name)
                    .replace(/\[ScriptPath\]/g,'')
                    .replace(/\[FactoryScriptPath\]/g,'')
                    .replace(/\[SpecScriptPath\]/g,'')
                    .replace(/\[SpecVariablesPath\]/g,'')
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
                    .replace(/\[SpecVariablesPath\]/g, specVariablesPath.replace(/\\/g,'\\\\'))
                    .replace(/\[ChildrenArray\]/g, children.map(child => utils.getJSONString(child)).join(','))
                    .replace(/\[PassesArray\]/g, [])
                    .replace(/\[VariableName\]/g, '')
                    .replace(/\[VariableValue\]/g, '')
                    .replace(/\[IsSingleton\]/g, singleton)
                );
                types = types.concat(children).concat(typeInfo);
            } catch (err) {
                console.log(`errors loading the ${scriptPath} script: `, err);
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
        }
        for(const type of types.filter(inf => !inf.variableName)) {
            type.variableName = `${type.typeName.split('')[0].toLowerCase()}${type.typeName.split('').splice(1,999).join('')}`;
        }
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

for(const info of getDependencyTree()) {
    
    if (!info.scriptPath) {
        continue;
    }

    const simpleArgs = ['scopeId'];
    const refArgs = [];
    const factoryCalls = [];
    let factoryRequireScripts =[];
    walkDependencyTree(info, (typeInfo, breakCallback) => {
        if (typeInfo.scriptPath) {
            const childSimpleArgs = ['scopeId'];
            walkDependencyTree(typeInfo, (moreTypeInfo) => {
                if (!moreTypeInfo.scriptPath) {
                    if (!childSimpleArgs.find(x => x === moreTypeInfo.variableName)) {
                        childSimpleArgs.push(moreTypeInfo.variableName);
                    }
                }
            });
            const factoryCallCreate = factoryCallCreateTemplate
                .replace(/\[TypeVariableNames\]/g, [typeInfo.variableName])
                .replace(/\[TypeName\]/g, typeInfo.typeName)
                .replace(/\[Args\]/g, childSimpleArgs);
            if (!factoryCalls.find(x => x === factoryCallCreate)) {
                factoryCalls.unshift(factoryCallCreate);
            }
            const factoryRequire = factoryRequireTemplate
                .replace(/\[TypeName\]/g, typeInfo.typeName)
                .replace(/\[RequireScriptPath\]/g, typeInfo.factoryScriptPath.replace(/\\/g,'\\\\'));
            if (!factoryRequireScripts.find(x => x === factoryRequire)) {
                factoryRequireScripts.push(factoryRequire);
            }
            if (!refArgs.find(x => x === typeInfo.variableName)) {
                refArgs.push(typeInfo.variableName);
            }
           breakCallback();
        }
    });
    walkDependencyTree(info, (typeInfo) => {
        if (!typeInfo.scriptPath) {
            if (!simpleArgs.find(x => x === typeInfo.variableName)) {
                simpleArgs.push(typeInfo.variableName);
            }
        }
    });

    let specVariableValues = {};
    if (existsSync(info.specVariablesPath)) {
        specVariableValues = require(info.specVariablesPath);
    }
    walkDependencyTree(info,(typeInfo) => {
        if (!typeInfo.scriptPath) {
            if (specVariableValues[typeInfo.variableName] === undefined) {
                specVariableValues[typeInfo.variableName] = null;
            }
        }
    });
    writeFileSync(info.specVariablesPath, utils.getJSONString(specVariableValues), 'utf8');

    let specArrangeVariables = [];
    specArrangeVariables.unshift(specVariablesTemplate
        .replace(/\[VariableNames\]/g, Object.keys(specVariableValues).join(','))
        .replace(/\[SpecVariablesPath\]/g, info.specVariablesPath.replace(/\\/g,'\\\\')));

    const factory = factoryTemplate
        .replace(/\[Args\]/g, info.children.map(x => x.variableName) )
        .replace(/\[ScriptPath\]/g, info.scriptPath.replace(/\\/g,'\\\\'))
        .replace(/\[TypeName\]/g, info.typeName)
        .replace(/\[FactoryCalls\]/g, factoryCalls.join('\r\n'))
        .replace(/\[SimpleArgs\]/g, simpleArgs)
        .replace(/\[TypeVariableName\]/g, info.variableName)
        .replace(/\[FactoryRequireScripts\]/g, factoryRequireScripts.join('\r\n'))
        .replace(/\[ReturnVariables\]/g, refArgs.concat([info.variableName]))
        .replace(/\[IsSingleton\]/g, info.singleton);
    writeFileSync(info.factoryScriptPath, factory, 'utf8');

    factoryRequireScripts = [];
    factoryRequireScripts.push(factoryRequireTemplate
        .replace(/\[TypeName\]/g, info.typeName)
        .replace(/\[RequireScriptPath\]/g, info.factoryScriptPath.replace(/\\/g,'\\\\'))
    );

    const factorySpec = factorySpecTemplate
        .replace(/\[ScriptPath\]/g, info.factoryScriptPath.replace(/\\/g,'\\\\'))
        .replace(/\[TypeName\]/g, info.typeName)
        .replace(/\[TypeVariableName\]/g, info.variableName)
        .replace(/\[Args\]/g, simpleArgs )
        .replace(/\[SpecArrangeVariables\]/g, specArrangeVariables.join('\r\n'))
        .replace(/\[FactoryRequireScripts\]/g, factoryRequireScripts.join('\r\n'));
    writeFileSync(info.specScriptPath, factorySpec, 'utf8');
}