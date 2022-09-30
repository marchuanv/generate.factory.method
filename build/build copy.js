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
require('./type.config');
require('./bindings.config');
const typeConfig = require(path.join(__dirname, 'type.config.json'));
const typeBindingsConfig = require(path.join(__dirname, 'type.bindings.config.json'));

if (!existsSync(generatedFactorySpecsDir)){
    mkdirSync(generatedFactorySpecsDir);
}
if (!existsSync(generatedFactoryScriptsDir)){
    mkdirSync(generatedFactoryScriptsDir);
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

for(const typeName of Object.keys(typeConfig)) {
    const info = typeConfig[typeName];
    let container = require(info.factoryContainerFilePath);
    if (utils.isEmptyObject(container)) {
        const factoryContainer = factoryContainerTemplate
            .replace(/\[TypeName\]/g, info.typeName)
            .replace(/\[TypeVariableName\]/g, info.variableName)
            .replace(/\[PrototypePath\]/g, info.prototypePath)
            .replace(/\[FactoryScriptPath\]/g, info.factoryScriptPath);
        const factoryContainerJson = utils.getJSONObject(factoryContainer);
        writeFileSync(info.factoryContainerFilePath, utils.getJSONString(factoryContainerJson), 'utf8');
        container = factoryContainerJson;
    }
    walkDependencyTree(info, (typeInfo) => {
        const isReferenceArgument = typeInfo.prototypePath ? true: false;
        if (!container.ctorArgsInfo.find(ctorArgInfo => ctorArgInfo.name === typeInfo.variableName)) {
            container.ctorArgsInfo.push({ name: typeInfo.variableName, isReferenceArgument });
        };
    });
    const bindingNames = Object.keys(typeBindingsConfig[info.typeName]);
    for(const factoryContainerBindingName of bindingNames) {
        let binding = container.bindings[factoryContainerBindingName];
        if (utils.isEmptyObject(binding)) {
            const factoryContainerBindingFilePath = info.factoryContainerBindingFilePath.replace('global', factoryContainerBindingName.toLowerCase());
            container.bindings = container.bindings.filter(b => b.factoryContainerBindingName !== factoryContainerBindingName);
            const referenceArgsCopy = utils.getJSONObject(utils.getJSONString(container.ctorArgsInfo.filter(ctorArgInfo => ctorArgInfo.isReferenceArgument)));
            walkDependencyTree(info, (typeInfo) => {
                if (typeInfo.prototypePath) {
                    const factoryContainerBindingRefArg =  utils.getJSONObject(factoryContainerBindingRefArgTemplate
                        .replace(/\[FactoryContainerTypeName\]/g,  typeInfo.typeName)
                        .replace(/\[FactoryContainerTypeVariableName\]/g,  typeInfo.variableName)
                        .replace(/\[factoryContainerFilePath\]/g, typeInfo.factoryContainerBindingFilePath));
                    referenceArgsCopy[typeInfo.variableName] = factoryContainerBindingRefArg;
                }
            });
            const primitiveArgsCopy = utils.getJSONObject(utils.getJSONString(container.ctorArgsInfo.filter(ctorArgInfo => !ctorArgInfo.isReferenceArgument)));
            const factoryContainerBindingJson = factoryContainerBindingTemplate
                .replace(/\[FactoryContainerBindingName\]/g, factoryContainerBindingName)
                .replace(/\[FactoryContainerBindingFilePath\]/g, factoryContainerBindingFilePath)
                .replace(/\[PrimitiveArgs\]/g, `{ ${ Object.keys(primitiveArgsCopy).map(key => `"${key}": null` ).join(',')} }`)
                .replace(/\[ReferenceArgs\]/g, utils.getJSONString(referenceArgsCopy));
            const factoryContainerBinding = utils.getJSONObject(factoryContainerBindingJson);
            writeFileSync(factoryContainerBindingFilePath, utils.getJSONString(factoryContainerBinding), 'utf8');
            delete factoryContainerBinding['primitiveArgs'];
            delete factoryContainerBinding['referenceArgs'];
            delete factoryContainerBinding['instance'];
            container.bindings.push(factoryContainerBinding);
            binding = factoryContainerBinding;
        }
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
        for(const argName of Object.keys(binding.primitiveArgs)) {
            if (binding.referenceArgs[argName]) {
                delete binding.primitiveArgs[argName];
            }
        };
        for(const key of Object.keys(binding.referenceArgs)) {
            const obj = binding.referenceArgs[key];
            if (!obj || typeof obj !== 'object') {
                throw new Error(`value can't be null for references and must be an object.`)
            }
            const emptyFactoryContainerBindingRefArgTemplate = utils.getJSONObject(factoryContainerBindingRefArgTemplate
                .replace(/\[FactoryContainerTypeName\]/g,  '')
                .replace(/\[FactoryContainerTypeVariableName\]/g,  '')
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
                if (typeInfo.prototypePath) {
                    if (obj.factoryContainerTypeName === typeInfo.typeName) {
                        obj.factoryContainerTypeVariableName = typeInfo.variableName;
                        obj.factoryContainerFilePath = typeInfo.factoryContainerFilePath.replace(/\\/g,'//');
                        found = true;
                        break;
                    } 
                }
            };
            if (!found) {
                obj.factoryContainerTypeVariableName = null;
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
        .replace(/\[ScriptPath\]/g, info.prototypePath.replace(/\\/g,'\\\\'))
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
