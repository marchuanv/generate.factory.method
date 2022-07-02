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

let typeInfo = [];
function getDependencyTree({ info }) {
    //typeInfo = typeInfo.sort((inf1,inf2) => inf1.level - inf2.level);
    if (!info) {
        const scriptPath = scripts.find(scPath => typeInfo.find(ti => ti.scriptPath === scPath) === undefined);
        if (scriptPath) {
            const scriptName = path.basename(scriptPath).replace(path.extname(scriptPath),'');
            const scriptDir = scriptPath.replace(`\\${scriptName}.js`,'');
            const factoryScriptName = `${scriptName}.factory.js`;
            const specScriptName = `${scriptName}.factory.spec.js`;
            const factoryScriptPath = path.join(scriptDir, factoryScriptName);
            const specScriptPath = path.join(specsFactoryDir, specScriptName);
            const sc = require(scriptPath);
            const key = Object.keys(sc)[0];
            const type = sc[key];
            const Id = utils.generateGUID();
            info = { Id, typeName: type.name, scriptPath, factoryScriptPath, specScriptPath, parent: null };
            typeInfo.push(info);
        }
        else {
            info = typeInfo.find(inf => inf.parent !== 'firstpass');
        }
    }
    if (!info) {
        return getDependencyTree({});
    }
    const params = utils.getFunctionParams(info.typeName);
    const otherDep = typeInfo.find(inf => params.find(param => param.typeName === inf.typeName )); // do other types depend on you?
    if (otherDep) {
        info.parent = otherDep;
        getDependencyTree({ info: otherDep });
    } else {
        info.parent = 'firstpass';
        getDependencyTree({});
    }
}

// for(const script of scripts) {
    
   
// }

// for(const info of typeInfo) {
//     info.dependencies = [];
//     for(const param of info.params) {
//         const refTypeInfo = typeInfo.find(inf => inf.typeName.toLowerCase() === param.name.toLowerCase());
//         if (refTypeInfo) {
//             param.reference = true;
//             param.typeName = refTypeInfo.typeName;
//             info.dependencies.push(refTypeInfo);
//             param.factoryScript = refTypeInfo.factoryScriptPath.replace(/\\/g,'\\\\');
//         } else {
//             param.reference = false;
//             param.typeName = 'variable';
//         }
//     }
// }

// for(const info of typeInfo) {
//     const factory = factoryTemplate
//         .replace(/\[args\]/g, `{ ${info.params.map( x=>x.name )} }` )
//         .replace(/\[scriptpath\]/g, info.script.replace(/\\/g,'\\\\'))
//         .replace(/\[typename\]/g, info.typeName);
//     writeFileSync(info.factoryScriptPath, factory, 'utf8');
//     const spec = factorySpecTemplate
//         .replace(/\[scriptpath\]/g, info.factoryScriptPath.replace(/\\/g,'\\\\'))
//         .replace(/\[typename\]/g, info.typeName)
//         .replace(/\[args\]/g, `{ ${info.params.map( x => x.name )} }` );
//     writeFileSync(info.specScriptPath, spec, 'utf8');
// }

getDependencyTree({});

console.log('done');


// for(const info of typeInfo) {
//     const requireScripts = info.params.filter(p => p.reference).map(p => `const { ${p.typeName}Factory } = require('${p.factoryScript}');`).join('\r\n');
//     const nonRefArgsVariableNames = info.params.filter(p => !p.reference).map(p => `const ${p.name} = null;`).join('\r\n');
//     const refArgsVariableNames = info.params.filter(p => p.reference).map(p => `const ${p.name} = ${p.name}Factory.create([nonRefArgsVariableNames]);`).join('\r\n');
//     const factoryVariableNames = info.params.filter(p => p.reference).map(p => `const ${p.name}Factory = new ${p.typeName}Factory([refArgsVariableNames]);`).join('\r\n');
//     const spec = readFileSync(info.specScriptPath,'utf8')
//         .replace(/\[requireScripts\]/g, `[factoryVariableNames]\r\n${requireScripts}`)
//         .replace(/\[nonRefArgsVariableNames\]/g, nonRefArgsVariableNames)
//         .replace(/\[refArgsVariableNames\]/g, refArgsVariableNames)
//         .replace(/\[factoryVariableNames\]/g, `[factoryVariableNames]\r\n${factoryVariableNames}`)
//     writeFileSync(info.specScriptPath, spec, 'utf8');
// }




// for(const i of info) {



//     console.log(`dependencies for type ${i.type.name} are: `, i.typeDepArray);
// }