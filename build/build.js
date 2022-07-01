const { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } = require('fs');
const path = require('path');
const utils = require('utils');
const libDir = path.join(__dirname, '../lib');
const specsFactoryDir = path.join(__dirname, '../spec', 'factory');
const rootScripts = readdirSync(libDir, { withFileTypes: true }).filter(dirent => dirent.isFile() && dirent.name.indexOf('.factory.js') === -1).map(file => path.join(libDir, file.name));
const httpScripts = readdirSync(path.join(libDir, 'http'), { withFileTypes: true }).filter(dirent => dirent.isFile() && dirent.name.indexOf('.factory.js') === -1).map(file => path.join(libDir, 'http', file.name));
const websocketScripts = readdirSync(path.join(libDir, 'websocket'), { withFileTypes: true }).filter(dirent => dirent.isFile() && dirent.name.indexOf('.factory.js') === -1).map(file => path.join(libDir, 'websocket', file.name));
const scripts = rootScripts.concat(httpScripts.concat(websocketScripts));
const factoryTemplate = readFileSync(path.join(__dirname,'factory.template'),'utf8');
const factorySpecTemplate = readFileSync(path.join(__dirname,'factory.spec.template'),'utf8');

if (!existsSync(specsFactoryDir)){
    mkdirSync(specsFactoryDir);
}

for(const script of scripts) {
    const scriptName = path.basename(script).replace(path.extname(script),'');
    const scriptDir = script.replace(`\\${scriptName}.js`,'');
    const factoryScriptName = `${scriptName}.factory.js`;
    const specScriptName = `${scriptName}.factory.spec.js`;
    const factoryScriptPath = path.join(scriptDir, factoryScriptName);
    const specScriptPath = path.join(specsFactoryDir, specScriptName);
    const sc = require(script);
    const keys = Object.keys(sc);
    for(const key of keys){
        const type = sc[key];
        const parameters = utils.getFunctionParams(type);

        const factory = factoryTemplate
            .replace(/\[args\]/g, `{ ${parameters.map( x=>x.name )} }` )
            .replace(/\[scriptpath\]/g, script.replace(/\\/g,'\\\\'))
            .replace(/\[typename\]/g, type.name);
        writeFileSync(factoryScriptPath, factory, 'utf8');

        const spec = factorySpecTemplate
            .replace(/\[args\]/g, `{ ${parameters.map( x=>x.name )} }` )
            .replace(/\[scriptpath\]/g, factoryScriptPath.replace(/\\/g,'\\\\'))
            .replace(/\[typename\]/g, type.name);
        writeFileSync(specScriptPath, spec, 'utf8');
    }
}
// const references = typeInfo.filter(cnf => typeInfo.find(cnf2 => cnf2.parameters.find(p => p.name.toLowerCase() === cnf.variableName)));
// let refParams = typeInfo.map(info2 => info2.parameters.filter(p => references.find(ref => ref.variableName === p.name.toLowerCase())));
// refParams = refParams.flat();
// for (const p of refParams){
//     p.reference = true;
// }

// for(const config of typeInfo) {
//     const scriptTypes = require(config.script);
//     const type = scriptTypes[Object.keys(scriptTypes)[0]];
//     const ctorParams = getCtorParameters({ type, isImmediate: false, isReference: false });
//     const ctorParamsTemplate = getCtorParameters({ type, isImmediate: false, isReference: false });
//     Object.defineProperty(this, config.variableName, { configurable: false, get : () => {
//         const ctor = {
//             create: (id, ...args) => {
//                 const ctorParamKeys = Object.keys(args);
//                 const ctorParamsTemplateKeys = Object.keys(ctorParamsTemplate);
//                 const allKeys = ctorParamsTemplateKeys.filter(key => ctorParamKeys.find(key2 => key2 === key)).filter(key => ctorParams[key]);
//                 const hasAllKeys = allKeys.length === ctorParamsTemplateKeys.length;
//                 const invalidKey = ctorParamKeys.find(key => ctorParamsTemplateKeys.filter(key2 => key2 === key).length === 0);
//                 if (invalidKey) {
//                     throw new Error(`${config.name} does not have a ${invalidKey} constructor parameter.`);
//                 }
//                 if (hasAllKeys) {
//                     const instance = getInstance({ config, otherCtorParams: ctorParams });
//                     Object.defineProperty(instance, 'factory', { value: this });
//                     Object.freeze(instance);
//                     Object.defineProperty(this, config.variableName, { value: instance });
//                     return instance;
//                 }
//             }
//         };
//         return ctor;
//     }});
// }