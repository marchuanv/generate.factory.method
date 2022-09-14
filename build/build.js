const UglifyJS = require("uglify-js");
const { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, appendFileSync } = require('fs');
const path = require('path');
const utils = require('utils');
const libDir = path.join(__dirname, '../lib');
const specsFactoryDir = path.join(__dirname, '../spec', 'factory');
const libFactoryDir = path.join(__dirname, '../lib', 'factory');
const rootScripts = readdirSync(libDir, { withFileTypes: true }).filter(dirent => dirent.isFile()).map(file => path.join(libDir, file.name));
const httpScripts = readdirSync(path.join(libDir, 'http'), { withFileTypes: true }).filter(dirent => dirent.isFile()).map(file => path.join(libDir, 'http', file.name));
const websocketScripts = readdirSync(path.join(libDir, 'websocket'), { withFileTypes: true }).filter(dirent => dirent.isFile()).map(file => path.join(libDir, 'websocket', file.name));
const scripts = rootScripts.concat(httpScripts.concat(websocketScripts)).filter(scPath => scPath.indexOf('prototype.js') > -1);
const factoryTemplate = readFileSync(path.join(__dirname,'factory.template'),'utf8');
const factorySpecTemplate = readFileSync(path.join(__dirname,'factory.spec.template'),'utf8');
const factoryContainerTemplate = readFileSync(path.join(__dirname,'factory.container.template.json'),'utf8');
const factoryRequireTemplate = readFileSync(path.join(__dirname,'factory.require.template'),'utf8');
const specVariablesTemplate = readFileSync(path.join(__dirname,'spec.variables.template'),'utf8');
const typeInfoTemplate = readFileSync(path.join(__dirname,'typeinfo.template'),'utf8');
const factoryMinificationTemplate = readFileSync(path.join(__dirname,'factory.minification.template'),'utf8');
const singletonConfig = require(path.join(__dirname,'singletons.json'),'utf8');
const componentMinPath = path.join(__dirname, '../component.min.js');
const factory = require(path.join(libDir,'factory.js'));

if (!existsSync(specsFactoryDir)){
    mkdirSync(specsFactoryDir);
}
if (!existsSync(libFactoryDir)){
    mkdirSync(libFactoryDir);
}

function getFunctionCode(func) {
    let code = func.toString();
    for(const funcName in func.prototype) {
        let prop = func.prototype[funcName]; 
        if (!prop) {
            prop = "''";
        }
        code = `${code}\r\n${func.name}.prototype.${funcName} = ${prop.toString()};`;
    }
    code = `${code}\r\n`;
    return code;
}

function getDependencyTree(typeInfo, pass = 'firstpass', types = []) {
    if (!typeInfo || utils.isEmptyObject(typeInfo)) {
        const scriptPath = scripts.find(scPath => types.find(ti => ti.scriptPath === scPath) === undefined);
        if (scriptPath) {
            try {
                const sc = require(scriptPath);
                const key = Object.keys(sc)[0];
                const type = sc[key];
                
                const scriptName = type.name.toLowerCase();
                const containerScriptName = `${scriptName}.container.json`;
                const containerScriptPath = path.join(libDir, 'factory', containerScriptName);
                const factoryScriptName = `${scriptName}.factory.js`;
                const minFactoryScriptName = `${scriptName}.factory.min.js`;
                const specScriptName = `${scriptName}.factory.spec.js`;
                const factoryScriptPath = path.join(libDir, 'factory', factoryScriptName);
                const minFactoryScriptPath = path.join(libDir, 'factory', minFactoryScriptName);
                const specScriptPath = path.join(specsFactoryDir, specScriptName);
                const specVariablesPath =  path.join(specsFactoryDir, `${scriptName}.factory.spec.variables.json`);

                const singleton = singletonConfig.find(cConf => cConf.typeName.toLowerCase() === key.toLowerCase() && cConf.singleton) ? true : false;
                const parameters = utils.getFunctionParams(type) || [];
                const children = parameters.map(param => utils.getJSONObject(typeInfoTemplate
                    .replace(/\[TypeName\]/g, param.name)
                    .replace(/\[ScriptPath\]/g,'')
                    .replace(/\[ContainerScriptPath\]/g,'')
                    .replace(/\[FactoryScriptPath\]/g,'')
                    .replace(/\[MinFactoryScriptPath\]/g,'')
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
                    .replace(/\[ContainerScriptPath\]/g, containerScriptPath.replace(/\\/g,'\\\\') )
                    .replace(/\[FactoryScriptPath\]/g, factoryScriptPath.replace(/\\/g,'\\\\'))
                    .replace(/\[MinFactoryScriptPath\]/g, minFactoryScriptPath.replace(/\\/g,'\\\\'))
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
    const primitiveArgs = ['scopeId'];
    const refArgs = [];
    const factoryCalls = [];
    let factoryRequireScripts =[];
    walkDependencyTree(info, (typeInfo, breakCallback) => {
        if (typeInfo.scriptPath) {
            const childPrimitiveArgsArgs = ['scopeId'];
            walkDependencyTree(typeInfo, (moreTypeInfo) => {
                if (!moreTypeInfo.scriptPath) {
                    if (!childPrimitiveArgsArgs.find(x => x === moreTypeInfo.variableName)) {
                        childPrimitiveArgsArgs.push(moreTypeInfo.variableName);
                    }
                }
            });
            const factoryRequire = factoryRequireTemplate
                .replace(/\[TypeName\]/g, typeInfo.typeName)
                .replace(/\[RequireScriptPath\]/g, typeInfo.factoryScriptPath.replace(/\\/g,'\\\\'));
            if (!factoryRequireScripts.find(x => x === factoryRequire)) {
                factoryRequireScripts.push(factoryRequire);
            }
            if (!refArgs.find(arg => arg === `"${typeInfo.variableName}": "type:${typeInfo.typeName}"` )) {
                refArgs.push(`"${typeInfo.variableName}": "type:${typeInfo.typeName}"`);
            }
           breakCallback();
        }
    });

    walkDependencyTree(info, (typeInfo) => {
        if (!typeInfo.scriptPath) {
            if (!primitiveArgs.find(x => x === typeInfo.variableName)) {
                primitiveArgs.push(typeInfo.variableName);
            }
        }
    });

    const factoryContainer = factoryContainerTemplate
        .replace(/\[TypeVariableName\]/g, info.variableName)
        .replace(/\[IsSingleton\]/g, info.singleton)
        .replace(/\[PrimitiveArgs\]/g, `{ ${ primitiveArgs.map(sa => `"${sa}": null` ).join(',')} }`)
        .replace(/\[RefArgs\]/g, `{ ${refArgs.join(',')} }`)
        .replace(/\[TypeName\]/g, info.typeName);

    if (existsSync(info.containerScriptPath)){
        const config = require(info.containerScriptPath);
        const loadedFactoryContainer = config[Object.keys(config)[0]];
        for(const bindingName of Object.keys(loadedFactoryContainer.bindings)) {
            const binding = loadedFactoryContainer.bindings[bindingName];
            const newPrimitiveArgs = primitiveArgs.filter(argName => Object.keys(binding.primitiveArgs).find(key => key === argName) === undefined);
            binding.primitiveArgs['scopeId'] = bindingName;
            for(const argName of newPrimitiveArgs) {
                if (!binding.refArgs[argName]) {
                    binding.primitiveArgs[argName] = null;
                }
            };
            for(const argName of Object.keys(binding.primitiveArgs)) {
                const value = binding.primitiveArgs[argName];
                if (value && value.indexOf('type:') > -1) {
                    refArgs.push(`"${argName}": "${value.replace('type:','')}"`);
                    delete binding.primitiveArgs[argName];
                }
            };
            const refArgObjects = refArgs.map(refArg => utils.getJSONObject(`{${refArg}}`));
            const newRefArgs = refArgObjects.filter(refArg => Object.keys(binding.refArgs).find(key => refArg[key]) === undefined);
            for(const arg of newRefArgs) {
                const key = Object.keys(arg)[0];
                const value = arg[key];
                binding.refArgs[key] = `type:${value}`;
            };
            binding.instance = {};
            binding.instance[info.variableName] = null;
        };
        loadedFactoryContainer.type = `type:${info.typeName}`;
        loadedFactoryContainer.variableName = info.variableName;
        config[Object.keys(config)[0]] = loadedFactoryContainer;
        writeFileSync(info.containerScriptPath, utils.getJSONString(config), 'utf8');
    } else {
        writeFileSync(info.containerScriptPath, factoryContainer, 'utf8');
    }

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
        .replace(/\[IsSingleton\]/g, info.singleton)
        .replace(/\[SpecVariablesPath\]/g, info.specVariablesPath.replace(/\\/g,'\\\\')));

    const primitiveArgsFiltered = primitiveArgs.filter(sa => sa !== 'scopeId');
    const factory = factoryTemplate
        .replace(/\[Args\]/g, info.children.map(x => x.variableName) )
        .replace(/\[ScriptPath\]/g, info.scriptPath.replace(/\\/g,'\\\\'))
        .replace(/\[ContainerScriptPath\]/g, info.containerScriptPath.replace(/\\/g,'\\\\'))
        .replace(/\[TypeName\]/g, info.typeName)
        .replace(/\[FactoryCalls\]/g, factoryCalls.join('\r\n'))
        .replace(/\[PrimitiveArgs\]/g, primitiveArgs)
        .replace(/\[PrimitiveArgsFiltered\]/g, primitiveArgsFiltered)
        .replace(/\[FactoryRequireScripts\]/g, factoryRequireScripts.join('\r\n'));
    writeFileSync(info.factoryScriptPath, factory, 'utf8');

    const factoryMinification = factoryMinificationTemplate
        .replace(/\[Args\]/g, info.children.map(x => x.variableName) )
        .replace(/\[TypeName\]/g, info.typeName)
        .replace(/\[FactoryCalls\]/g, factoryCalls.join('\r\n'))
        .replace(/\[PrimitiveArgs\]/g, primitiveArgs)
        .replace(/\[PrimitiveArgsFiltered\]/g, primitiveArgsFiltered)
        .replace(/\[TypeVariableName\]/g, info.variableName);
    writeFileSync(info.minFactoryScriptPath, factoryMinification, 'utf8');

    factoryRequireScripts = [];
    factoryRequireScripts.push(factoryRequireTemplate
        .replace(/\[TypeName\]/g, info.typeName)
        .replace(/\[RequireScriptPath\]/g, info.factoryScriptPath.replace(/\\/g,'\\\\'))
    );

    const factorySpec = factorySpecTemplate
        .replace(/\[ScriptPath\]/g, info.factoryScriptPath.replace(/\\/g,'\\\\'))
        .replace(/\[TypeName\]/g, info.typeName)
        .replace(/\[TypeVariableName\]/g, info.variableName)
        .replace(/\[Args\]/g, primitiveArgs )
        .replace(/\[SpecArrangeVariables\]/g, specArrangeVariables.join('\r\n'))
        .replace(/\[FactoryRequireScripts\]/g, factoryRequireScripts.join('\r\n'));
    writeFileSync(info.specScriptPath, factorySpec, 'utf8');
}

//minification
const { Factory } = factory;
writeFileSync(componentMinPath, `${getFunctionCode(Factory)};\r\n`, 'utf8');
for(const info of getDependencyTree()) {
    const script =  require(info.scriptPath);
    const type = script[info.typeName];
    appendFileSync(componentMinPath, getFunctionCode(type), 'utf8');
}
for(const info of getDependencyTree()) {
    const script =  readFileSync(info.minFactoryScriptPath, 'utf8');
    appendFileSync(componentMinPath, script, 'utf8');
}

const options = { toplevel: true };
let code = readFileSync(componentMinPath,'utf8');
({ code } = UglifyJS.minify(code));
if (!code) {
    throw new Error(`could not minify ${func.name}`);
}
writeFileSync(componentMinPath, code, 'utf8');