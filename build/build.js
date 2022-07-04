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
const factorySpecRequireFactoryTemplate = readFileSync(path.join(__dirname,'factory.spec.require.factory.template'),'utf8');

if (!existsSync(specsFactoryDir)){
    mkdirSync(specsFactoryDir);
}

function getDependencyTree(info, pass, types) {
    if (!pass) {
        pass = 'firstpass';
    }
    if (!types) {
        types = [];
    }
    if (!info || utils.isEmptyObject(info)) {
        const scriptPath = scripts.find(scPath => types.find(ti => ti.scriptPath === scPath) === undefined);
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
            const params = utils.getFunctionParams(type);
            info = { type, typeName: type.name, scriptPath, factoryScriptPath, specScriptPath, parents: [], passes: [], params, variableName: '' };
            types.push(info);
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
        for(const inf of types){
            delete inf.passes;
            inf.variableName =  types.map(t => t.params).flat()
                                        .map(param => param.name)
                                        .find(paramName => paramName.toLowerCase() === inf.typeName.toLowerCase());
            if (!inf.variableName) {
                let variableNameArray = inf.typeName.split('');
                const firstLetter = variableNameArray[0].toLowerCase();
                inf.variableName = `${firstLetter}${variableNameArray.splice(1,variableNameArray.length-1).join('')}`;
            }

        }
        return types;
    }
  
    const otherDependencies = types.filter(inf => info.params.find(param => param.name.toLowerCase() === inf.typeName.toLowerCase()))
                                .filter(oDep => info.parents.find(parent => parent.typeName === oDep.typeName) === undefined); // do other types depend on you?
    if (otherDependencies.length > 0) {
        for(const otherDep of otherDependencies) {
            info.parents.push(otherDep);
            return getDependencyTree(otherDep, pass, types);
        }
    } else {
        info.passes.push(pass);
        return getDependencyTree(null, pass, types);
    }
}

for(const info of getDependencyTree()) {
    const factory = factoryTemplate
        .replace(/\[args\]/g, `{ ${info.params.map( x=>x.name )} }` )
        .replace(/\[scriptpath\]/g, info.scriptPath.replace(/\\/g,'\\\\'))
        .replace(/\[typename\]/g, info.typeName);
    writeFileSync(info.factoryScriptPath, factory, 'utf8');
    const spec = factorySpecTemplate
        .replace(/\[ScriptPath\]/g, info.factoryScriptPath.replace(/\\/g,'\\\\'))
        .replace(/\[TypeName\]/g, info.typeName)
        .replace(/\[Args\]/g, `{ ${info.params.map( x => x.name )} }` );
    writeFileSync(info.specScriptPath, spec, 'utf8');
}

//Require Scripts
for(const info of getDependencyTree()) {
    const factoryRequireScripts = [];
    factoryRequireScripts.push(info.parents.map(p => factorySpecRequireFactoryTemplate
        .replace(/\[TypeName\]/g, p.typeName)
        .replace(/\[RequireScriptPath\]/g, p.factoryScriptPath)
    ));
    factoryRequireScripts.push(factorySpecRequireFactoryTemplate
        .replace(/\[TypeName\]/g, info.typeName)
        .replace(/\[RequireScriptPath\]/g, info.factoryScriptPath)
    );
    const spec = readFileSync(info.specScriptPath,'utf8').replace(/\[FactoryRequireScripts\]/g, factoryRequireScripts.join('\r\n'));
    writeFileSync(info.specScriptPath, spec, 'utf8');
}




// for(const info of getDependencyTree()) {
//     const requireScripts = info.parents.map(p => `const { ${p.typeName}Factory } = require('${p.factoryScriptPath.replace(/\\/g,'\\\\')}');`).join('\r\n');
//     // const nonRefArgsVariableNames = info.params.filter(p => !p.reference).map(p => `const ${p.name} = null;`).join('\r\n');
//     // const refArgsVariableNames = info.params.filter(p => p.reference).map(p => `const ${p.name} = ${p.name}Factory.create([nonRefArgsVariableNames]);`).join('\r\n');
//     // const factoryVariableNames = info.params.map(p => `const ${p.name}Factory = new ${p.typeName}Factory([refArgsVariableNames]);`).join('\r\n');
//     const spec = readFileSync(info.specScriptPath,'utf8')
//         .replace(/\[requireScripts\]/g, `${requireScripts}\r\n[factoryVariableNames]`)
//         .replace(/\[nonRefArgsVariableNames\]/g, nonRefArgsVariableNames)
//         .replace(/\[refArgsVariableNames\]/g, refArgsVariableNames)
//         .replace(/\[factoryVariableNames\]/g, `[factoryVariableNames]\r\n${factoryVariableNames}`)
//     writeFileSync(info.specScriptPath, spec, 'utf8');
// }




// for(const i of info) {



//     console.log(`dependencies for type ${i.type.name} are: `, i.typeDepArray);
// }