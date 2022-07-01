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

const info = [];
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
        const allParams = utils.getFunctionParams(type);
        info.push({ type, script, factoryScriptPath, specScriptPath, params: allParams });
    }
}

for(const i of info) {
    for(const p of i.params) {
        p.typeName = 'variable';
        p.reference = false;
    }
    for(const p of i.params.filter(p => info.find(i => i.type.name.toLowerCase() === p.name.toLowerCase()))) {
        const depInfo = info.find(inf => inf.type.name.toLowerCase() === p.name.toLowerCase());
        if (!depInfo) {
            throw new Error(`${p.name} parameter does not have a referenced type`);
        }
        p.reference = true;
        p.typeName = depInfo.type.name;
        p.factoryScript = depInfo.factoryScriptPath.replace(/\\/g,'\\\\');
    }

    const nonRefArgsVariableNames = i.params.filter(p => !p.reference).map(p => `const ${p.name} = null;`).join('\r\n');
    const factoryVariableNames = i.params.filter(p => p.reference).map(p => `const ${p.name}Factory = new ${p.typeName}Factory();`).join('\r\n');
    const refArgsVariableNames = i.params.filter(p => p.reference)
                                    .map(p => `const ${p.name} = ${p.name}Factory.create();`)
                                    .join('\r\n');
    const requireScripts = i.params.filter(p => p.reference).map(p => `const { ${p.typeName}Factory } = require('${p.factoryScript}');`).join('\r\n');

    const factory = factoryTemplate
        .replace(/\[args\]/g, `{ ${i.params.map( x=>x.name )} }` )
        .replace(/\[scriptpath\]/g, i.script.replace(/\\/g,'\\\\'))
        .replace(/\[typename\]/g, i.type.name);
    writeFileSync(i.factoryScriptPath, factory, 'utf8');
    const spec = factorySpecTemplate
        .replace(/\[requireScripts\]/g, requireScripts)
        .replace(/\[nonRefArgsVariableNames\]/g, nonRefArgsVariableNames)
        .replace(/\[factoryVariableNames\]/g, factoryVariableNames)
        .replace(/\[refArgsVariableNames\]/g, refArgsVariableNames)
        .replace(/\[scriptpath\]/g, i.factoryScriptPath.replace(/\\/g,'\\\\'))
        .replace(/\[typename\]/g, i.type.name)
        .replace(/\[args\]/g, `{ ${i.params.map( x=>x.name )} }` );
    writeFileSync(i.specScriptPath, spec, 'utf8');
}
