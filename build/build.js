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
const factoryContainerBindingTemplate = readFileSync(path.join(__dirname,'factory.container.binding.template.json'),'utf8');
const factoryRequireTemplate = readFileSync(path.join(__dirname,'factory.require.template'),'utf8');
const typeInfoTemplate = readFileSync(path.join(__dirname,'typeinfo.template'),'utf8');
const factoryMinificationTemplate = readFileSync(path.join(__dirname,'factory.minification.template'),'utf8');
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
                const containerScriptName = `${scriptName}.factory.container.json`;
                const containerScriptPath = path.join(libDir, 'factory', containerScriptName);
                const containerBindingScriptName = `${scriptName}.container.global.binding.json`;
                const containerBindingScriptPath = path.join(libDir, 'factory', containerBindingScriptName);
                const factoryScriptName = `${scriptName}.factory.js`;
                const minFactoryScriptName = `${scriptName}.factory.min.js`;
                const specScriptName = `${scriptName}.factory.spec.js`;
                const factoryScriptPath = path.join(libDir, 'factory', factoryScriptName);
                const minFactoryScriptPath = path.join(libDir, 'factory', minFactoryScriptName);
                const specScriptPath = path.join(specsFactoryDir, specScriptName);

                const parameters = utils.getFunctionParams(type) || [];
                const children = parameters.map(param => utils.getJSONObject(typeInfoTemplate
                    .replace(/\[TypeName\]/g, param.name)
                    .replace(/\[ScriptPath\]/g,'')
                    .replace(/\[ContainerScriptPath\]/g,'')
                    .replace(/\[ContainerBindingScriptPath\]/g,'')
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
                    .replace(/\[ContainerScriptPath\]/g, containerScriptPath.replace(/\\/g,'\\\\') )
                    .replace(/\[ContainerBindingScriptPath\]/g, containerBindingScriptPath.replace(/\\/g,'\\\\') )
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

for(const info of getDependencyTree()) {
    if (!info.scriptPath) {
        continue;
    }
    const referenceArgs = {};
    const primitiveArgs = { scopeId: null };

    const factoryCalls = [];
    let factoryRequireScripts =[];

    walkDependencyTree(info, (typeInfo) => {
        if (typeInfo.scriptPath) {
            const keys = Object.keys(referenceArgs);
            if (!keys.find(key => key === typeInfo.variableName)) {
                referenceArgs[typeInfo.variableName] = {
                    factoryMethod: `create${typeInfo.typeName}`,
                    factoryScript: typeInfo.factoryScriptPath.replace(/\\/g,'//')
                };
            }
        } else {
            const keys = Object.keys(primitiveArgs);
            if (!keys.find(key => key === typeInfo.variableName)) {
                primitiveArgs[typeInfo.variableName] = null;
            }
        }
    });

    if (!existsSync(info.containerScriptPath)) {
        const factoryContainer = factoryContainerTemplate
            .replace(/\[TypeName\]/g, info.typeName)
            .replace(/\[TypeVariableName\]/g, info.variableName);
        const factoryContainerJson = utils.getJSONObject(factoryContainer);
        writeFileSync(info.containerScriptPath, utils.getJSONString(factoryContainerJson), 'utf8');
    }

    let container = require(info.containerScriptPath);
    const containerRootName = Object.keys(container)[0];
    container = container[containerRootName];
    const bindingNames = container.bindings.map(b => b.name);
    const { Id } = container;
    for(const bindingName of bindingNames) {

        const containerBindingScriptPath = info.containerBindingScriptPath.replace('global', bindingName.toLowerCase());
        if (!existsSync(containerBindingScriptPath)) {
            const factoryContainerBinding = factoryContainerBindingTemplate
                .replace(/\[BindingId\]/g, bindingName)
                .replace(/\[TypeName\]/g, info.typeName)
                .replace(/\[PrimitiveArgs\]/g, `{ ${ Object.keys(primitiveArgs).map(key => `"${key}": null` ).join(',')} }`)
                .replace(/\[ReferenceArgs\]/g, utils.getJSONString(referenceArgs));
            const factoryContainerBindingJson = utils.getJSONObject(factoryContainerBinding);
            writeFileSync(containerBindingScriptPath, utils.getJSONString(factoryContainerBindingJson), 'utf8');
        }

        let binding = require(containerBindingScriptPath);
        const bindingRootName = Object.keys(binding)[0];
        binding = binding[bindingRootName];
        const newPrimitiveArgs = Object.keys(primitiveArgs).filter(key1 => Object.keys(binding.primitiveArgs).find(key2 => key1 === key2) === undefined);
        binding.primitiveArgs['scopeId'] = bindingName;
        for(const argName of newPrimitiveArgs) {
            if (!binding.referenceArgs[argName]) {
                binding.primitiveArgs[argName] = null;
            }
        };
        for(const key of Object.keys(binding.primitiveArgs)) {
            const value = binding.primitiveArgs[key];
            if (value && typeof value === 'object') {
                referenceArgs[key] = value;
                delete binding.primitiveArgs[key];
            }
        };
        const newRefArgs = Object.keys(referenceArgs).filter(key1 => Object.keys(binding.referenceArgs).find(key2 => key2 === key1) === undefined);
        for(const key of newRefArgs) {
            const value = referenceArgs[key];
            binding.referenceArgs[key] = value;
        };
        const bindingRoot = {};
        bindingRoot[bindingRootName] = binding;
        writeFileSync(containerBindingScriptPath, utils.getJSONString(bindingRoot), 'utf8');
      
        const containerBinding = container.bindings.find(b => b.name === bindingName);
        containerBinding.bindingFilePath = containerBindingScriptPath.replace(/\\/g,'//');
        const updatedContainer = {};
        updatedContainer[containerRootName] = container;
        writeFileSync(info.containerScriptPath, utils.getJSONString(updatedContainer), 'utf8');
        if (containerBinding.name.toLowerCase().indexOf('test') > -1) {
            factoryRequireScripts.push(factoryRequireTemplate
                .replace(/\[TypeName\]/g, info.typeName)
                .replace(/\[RequireScriptPath\]/g, info.factoryScriptPath.replace(/\\/g,'\\\\'))
            );
            const factorySpec = factorySpecTemplate
                .replace(/\[ScriptPath\]/g, info.factoryScriptPath.replace(/\\/g,'\\\\'))
                .replace(/\[TypeName\]/g, info.typeName)
                .replace(/\[TypeVariableName\]/g, info.variableName)
                .replace(/\[Args\]/g, Object.keys(binding.primitiveArgs).join(','))
                .replace(/\[SpecArrangeVariables\]/g, `const specInput = ${utils.getJSONString(binding.primitiveArgs)}` ) 
                .replace(/\[FactoryRequireScripts\]/g, factoryRequireScripts.join('\r\n'));
            writeFileSync(info.specScriptPath, factorySpec, 'utf8');
        }
    };

    const factory = factoryTemplate
        .replace(/\[Args\]/g, info.children.map(x => x.variableName) )
        .replace(/\[ScriptPath\]/g, info.scriptPath.replace(/\\/g,'\\\\'))
        .replace(/\[ContainerScriptPath\]/g, info.containerScriptPath.replace(/\\/g,'\\\\'))
        .replace(/\[TypeName\]/g, info.typeName)
        .replace(/\[FactoryCalls\]/g, factoryCalls.join('\r\n'))
        .replace(/\[PrimitiveArgs\]/g, Object.keys(primitiveArgs).join(','))
        .replace(/\[FactoryRequireScripts\]/g, factoryRequireScripts.join('\r\n'));
    writeFileSync(info.factoryScriptPath, factory, 'utf8');

    const factoryMinification = factoryMinificationTemplate
        .replace(/\[Args\]/g, info.children.map(x => x.variableName) )
        .replace(/\[TypeName\]/g, info.typeName)
        .replace(/\[FactoryCalls\]/g, factoryCalls.join('\r\n'))
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