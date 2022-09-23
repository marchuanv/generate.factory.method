const UglifyJS = require("uglify-js");
const { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, appendFileSync } = require('fs');
const path = require('path');
const utils = require('utils');
const libDir = path.join(__dirname, '../lib');
const generatedFactorySpecsDir = path.join(__dirname, '../spec', 'factory', 'generated');
const generatedFactoryScriptsDir = path.join(__dirname, '../lib', 'factory', 'generated');
const rootScripts = readdirSync(libDir, { withFileTypes: true }).filter(dirent => dirent.isFile()).map(file => path.join(libDir, file.name));
const httpScripts = readdirSync(path.join(libDir, 'http'), { withFileTypes: true }).filter(dirent => dirent.isFile()).map(file => path.join(libDir, 'http', file.name));
const websocketScripts = readdirSync(path.join(libDir, 'websocket'), { withFileTypes: true }).filter(dirent => dirent.isFile()).map(file => path.join(libDir, 'websocket', file.name));
const scripts = rootScripts.concat(httpScripts.concat(websocketScripts)).filter(scPath => scPath.indexOf('prototype.js') > -1);
const factoryTemplate = readFileSync(path.join(__dirname,'factory.template'),'utf8');
const factorySpecTemplate = readFileSync(path.join(__dirname,'factory.spec.template'),'utf8');
const factoryContainerTemplate = readFileSync(path.join(__dirname,'factory.container.template.json'),'utf8');
const factoryContainerBindingTemplate = readFileSync(path.join(__dirname, 'factory.container.binding.template.json'),'utf8');
const factoryContainerBindingRefArgTemplate = readFileSync(path.join(__dirname, 'factory.container.binding.refarg.template.json'),'utf8');
const factoryRequireTemplate = readFileSync(path.join(__dirname,'factory.require.template'),'utf8');
const typeInfoTemplate = readFileSync(path.join(__dirname,'typeinfo.template'),'utf8');
const factoryMinificationTemplate = readFileSync(path.join(__dirname,'factory.minification.template'),'utf8');
const componentMinPath = path.join(__dirname, '../component.min.js');
const factoryScriptPath = path.join(libDir, 'factory', 'factory.js');
const factory = require(factoryScriptPath);
const bindingConfig = require(path.join(libDir, 'factory', 'binding.config.json'));

if (!existsSync(generatedFactorySpecsDir)){
    mkdirSync(generatedFactorySpecsDir);
}
if (!existsSync(generatedFactoryScriptsDir)){
    mkdirSync(generatedFactoryScriptsDir);
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
                    .replace(/\[ScriptPath\]/g,'')
                    .replace(/\[factoryContainerFilePath\]/g,'')
                    .replace(/\[FactoryContainerBindingFilePath\]/g,'')
                    .replace(/\[FactoryScriptPath\]/g,'')
                    .replace(/\[MinFactoryScriptPath\]/g,'')
                    .replace(/\[SpecScriptPath\]/g,'')
                    .replace(/\[ChildrenArray\]/g,'')
                    .replace(/\[PassesArray\]/g,'')
                    .replace(/\[VariableName\]/g, param.name)
                    .replace(/\[VariableValue\]/g, '')
                ));
                typeInfo = utils.getJSONObject(typeInfoTemplate
                    .replace(/\[TypeName\]/g, type.name)
                    .replace(/\[ScriptPath\]/g, scriptPath.replace(/\\/g,'\\\\') )
                    .replace(/\[FactoryContainerFilePath\]/g, factoryContainerFilePath.replace(/\\/g,'\\\\') )
                    .replace(/\[FactoryContainerBindingFilePath\]/g, factoryContainerBindingFilePath.replace(/\\/g,'\\\\') )
                    .replace(/\[FactoryScriptPath\]/g, factoryScriptPath.replace(/\\/g,'\\\\'))
                    .replace(/\[MinFactoryScriptPath\]/g, minFactoryScriptPath.replace(/\\/g,'\\\\'))
                    .replace(/\[SpecScriptPath\]/g, specScriptPath.replace(/\\/g,'\\\\'))
                    .replace(/\[ChildrenArray\]/g, children.map(child => utils.getJSONString(child)).join(','))
                    .replace(/\[PassesArray\]/g, [])
                    .replace(/\[VariableName\]/g, '')
                    .replace(/\[VariableValue\]/g, '')
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
const allTypeInfo = getDependencyTree();
for(const info of allTypeInfo) {
    if (!info.scriptPath) {
        continue;
    }
    const referenceArgs = {};
    const primitiveArgs = {};
    const factoryCalls = [];
    let factoryRequireScripts =[];
    walkDependencyTree(info, (typeInfo) => {
        if (typeInfo.scriptPath) {
            const keys = Object.keys(referenceArgs);
            if (!keys.find(key => key === typeInfo.variableName)) {
                referenceArgs[typeInfo.variableName] = {};
            }
        } else {
            const keys = Object.keys(primitiveArgs);
            if (!keys.find(key => key === typeInfo.variableName)) {
                primitiveArgs[typeInfo.variableName] = null;
            }
        }
    });
    if (!existsSync(info.factoryContainerFilePath)) {
        const factoryContainer = factoryContainerTemplate
            .replace(/\[TypeVariableName\]/g, info.variableName)
            .replace(/\[TypeScriptPath\]/g, info.scriptPath.replace(/\\/g,'//').replace('prototype.',''))
            .replace(/\[TypeName\]/g, info.typeName);
        const factoryContainerJson = utils.getJSONObject(factoryContainer);
        writeFileSync(info.factoryContainerFilePath, utils.getJSONString(factoryContainerJson), 'utf8');
    }
    const container = require(info.factoryContainerFilePath);
    const bindingNames = container.bindings.map(b => b.factoryContainerBindingName);
    for(const key of Object.keys(bindingConfig)) {
        const bindingName = key.replace(' ','').toLowerCase();
        bindingNames.push(bindingName);
    };
    for(const factoryContainerBindingName of bindingNames) {
        const factoryContainerBindingFilePath = info.factoryContainerBindingFilePath.replace('global', factoryContainerBindingName.toLowerCase());
        if (!existsSync(factoryContainerBindingFilePath)) {
            container.bindings = container.bindings.filter(b => b.factoryContainerBindingName !== factoryContainerBindingName);
            const referenceArgsCopy = utils.getJSONObject(utils.getJSONString(referenceArgs));
            walkDependencyTree(info, (typeInfo) => {
                if (typeInfo.scriptPath) {
                    const factoryContainerBindingRefArg =  utils.getJSONObject(factoryContainerBindingRefArgTemplate
                        .replace(/\[FactoryContainerName\]/g,  `${typeInfo.variableName}FactoryContainer`)
                        .replace(/\[FactoryContainerTypeName\]/g,  typeInfo.typeName)
                        .replace(/\[FactoryContainerFilePath\]/g, typeInfo.factoryContainerFilePath.replace(/\\/g,'//')));
                        referenceArgsCopy[typeInfo.variableName] = factoryContainerBindingRefArg;
                }
            });
            const factoryContainerBinding = factoryContainerBindingTemplate
                .replace(/\[FactoryContainerBindingName\]/g, factoryContainerBindingName)
                .replace(/\[FactoryContainerBindingFilePath\]/g, factoryContainerBindingFilePath.replace(/\\/g,'//'))
                .replace(/\[PrimitiveArgs\]/g, `{ ${ Object.keys(primitiveArgs).map(key => `"${key}": null` ).join(',')} }`)
                .replace(/\[ReferenceArgs\]/g, utils.getJSONString(referenceArgsCopy));
            const factoryContainerBindingJson = utils.getJSONObject(factoryContainerBinding);
            writeFileSync(factoryContainerBindingFilePath, utils.getJSONString(factoryContainerBindingJson), 'utf8');
            delete factoryContainerBindingJson['primitiveArgs'];
            delete factoryContainerBindingJson['referenceArgs'];
            delete factoryContainerBindingJson['instance'];
            container.bindings.push(factoryContainerBindingJson);
        }
        const binding = require(factoryContainerBindingFilePath);
        const newPrimitiveArgs = Object.keys(primitiveArgs).filter(key1 => Object.keys(binding.primitiveArgs).find(key2 => key1 === key2) === undefined);
        for(const argName of newPrimitiveArgs) {
            if (!binding.referenceArgs[argName]) {
                binding.primitiveArgs[argName] = null;
            }
        };
        const referenceArgsCopy = utils.getJSONObject(utils.getJSONString(referenceArgs));
        for(const key of Object.keys(binding.primitiveArgs)) {
            const value = binding.primitiveArgs[key];
            if (value) {
                if (typeof value === 'object') {
                    referenceArgsCopy[key] = value;
                    delete binding.primitiveArgs[key];
                }
                if (binding[key] !== undefined) {
                   binding.primitiveArgs[key] = binding[key];
                }
            }
        };
        const newRefArgs = Object.keys(referenceArgsCopy).filter(key1 => Object.keys(binding.referenceArgs).find(key2 => key2 === key1) === undefined);
        for(const key of newRefArgs) {
            const value = referenceArgsCopy[key];
            binding.referenceArgs[key] = value;
        };
        for(const key of Object.keys(binding.referenceArgs)) {
            const obj = binding.referenceArgs[key];
            if (!obj || typeof obj !== 'object') {
                throw new Error(`value can't be null for references and must be an object.`)
            }
            const emptyFactoryContainerBindingRefArgTemplate = utils.getJSONObject(factoryContainerBindingRefArgTemplate
                .replace(/\[FactoryContainerName\]/g,  '')
                .replace(/\[FactoryContainerTypeName\]/g,  '')
                .replace(/\[FactoryContainerFilePath\]/g, ''));
            const emptyFactoryContainerBindingRefArgTemplateKeys = Object.keys(emptyFactoryContainerBindingRefArgTemplate);
            const objFactoryContainerBindingRefArgTemplateKeys = Object.keys(obj);
            const missingFields = emptyFactoryContainerBindingRefArgTemplateKeys
                .filter(key1 => objFactoryContainerBindingRefArgTemplateKeys.find(key2 => key1 === key2) === undefined);
            for(const fieldName of missingFields) {
                obj[fieldName] = null;
            };

            let found = false;
            for(const typeInfo of allTypeInfo) {
                if (typeInfo.scriptPath) {
                    if (obj.factoryContainerTypeName === typeInfo.typeName) {
                        obj.factoryContainerFilePath = typeInfo.factoryContainerFilePath.replace(/\\/g,'//');
                        found = true;
                        break;
                    } 
                }
            };
            if (!found) {
                obj.factoryContainerFilePath = null;
            }
            binding.referenceArgs[key] = obj;
        };
        writeFileSync(factoryContainerBindingFilePath, utils.getJSONString(binding), 'utf8');
        writeFileSync(info.factoryContainerFilePath, utils.getJSONString(container), 'utf8');
    };
    for(const key of Object.keys(bindingConfig)) {
        const { generateSpecs } = bindingConfig[key];
        if (generateSpecs) {
            const bindingName = key.replace(' ','').toLowerCase();
            let binding = container.bindings.find(b => b.factoryContainerBindingName.toLowerCase() === bindingName);
            binding = require(binding.factoryContainerBindingFilePath);
            const primitiveArgsSpec = utils.getJSONObject(utils.getJSONString(binding.primitiveArgs));
            primitiveArgsSpec.factoryContainerBindingName = binding.factoryContainerBindingName;
            factoryRequireScripts.push(factoryRequireTemplate
                .replace(/\[TypeName\]/g, info.typeName)
                .replace(/\[RequireScriptPath\]/g, info.factoryScriptPath.replace(/\\/g,'\\\\'))
            );
            const factorySpec = factorySpecTemplate
                .replace(/\[ScriptPath\]/g, info.factoryScriptPath.replace(/\\/g,'\\\\'))
                .replace(/\[TypeName\]/g, info.typeName)
                .replace(/\[TypeVariableName\]/g, info.variableName)
                .replace(/\[Args\]/g, Object.keys(primitiveArgsSpec).join(','))
                .replace(/\[SpecArrangeVariables\]/g, `${utils.getJSONString(primitiveArgsSpec)};`) 
                .replace(/\[FactoryRequireScripts\]/g, factoryRequireScripts.join('\r\n'));
            writeFileSync(info.specScriptPath, factorySpec, 'utf8');
        }
    };

    binding = container.bindings.find(b => b.factoryContainerBindingName.toLowerCase() === 'global');
    binding = require(binding.factoryContainerBindingFilePath);
    const primitiveArgsWithBindingName = utils.getJSONObject(utils.getJSONString(binding.primitiveArgs));
    primitiveArgsWithBindingName.factoryContainerBindingName = binding.factoryContainerBindingName;
    const factory = factoryTemplate
        .replace(/\[FactoryScriptPath\]/g, factoryScriptPath.replace(/\\/g,'\\\\'))
        .replace(/\[Args\]/g, info.children.map(x => x.variableName) )
        .replace(/\[ScriptPath\]/g, info.scriptPath.replace(/\\/g,'\\\\'))
        .replace(/\[FactoryContainerFilePath\]/g, info.factoryContainerFilePath.replace(/\\/g,'\\\\'))
        .replace(/\[TypeName\]/g, info.typeName)
        .replace(/\[FactoryCalls\]/g, factoryCalls.join('\r\n'))
        .replace(/\[PrimitiveArgsWithBindingName\]/g, Object.keys(primitiveArgsWithBindingName).join(','))
        .replace(/\[PrimitiveArgs\]/g, Object.keys(primitiveArgs).join(','))
        .replace(/\[FactoryRequireScripts\]/g, factoryRequireScripts.join('\r\n'));
    writeFileSync(info.factoryScriptPath, factory, 'utf8');
    
    const factoryMinification = factoryMinificationTemplate
        .replace(/\[Args\]/g, info.children.map(x => x.variableName) )
        .replace(/\[TypeName\]/g, info.typeName)
        .replace(/\[FactoryCalls\]/g, factoryCalls.join('\r\n'))
        .replace(/\[PrimitiveArgsWithBindingName\]/g, Object.keys(primitiveArgsWithBindingName).join(','))
        .replace(/\[PrimitiveArgs\]/g, Object.keys(primitiveArgs).join(','))
        .replace(/\[TypeVariableName\]/g, info.variableName);
    writeFileSync(info.minFactoryScriptPath, factoryMinification, 'utf8');

   
}

//minification
// const { Factory } = factory;
// writeFileSync(componentMinPath, `${getFunctionCode(Factory)};\r\n`, 'utf8');
// for(const info of getDependencyTree()) {
//     const script =  require(info.scriptPath);
//     const type = script[info.typeName];
//     appendFileSync(componentMinPath, getFunctionCode(type), 'utf8');
// }
// for(const info of getDependencyTree()) {
//     const script =  readFileSync(info.minFactoryScriptPath, 'utf8');
//     appendFileSync(componentMinPath, script, 'utf8');
// }

// const options = { toplevel: true };
// let code = readFileSync(componentMinPath,'utf8');
// ({ code } = UglifyJS.minify(code));
// if (!code) {
//     throw new Error(`could not minify ${func.name}`);
// }
// writeFileSync(componentMinPath, code, 'utf8');
