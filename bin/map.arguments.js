#!/usr/bin/env node
const path = require('path');
module.exports = {
    command: null,
    libGuid: null,
    scriptPath: null,
    prototypeScriptPath: null,
    isSingleton: null,
    isContextSingleton: null,
    scriptOutputDirPath: null,
    contextName: null,
    defaultContextName: null
};
const args = process.argv.slice(2,process.argv.length);
module.exports.command = args[0];
if (module.exports.command.indexOf('--') > -1) {
    module.exports.command = null;
}
for(const param of args) {
    const name = param.replace('--','');
    const index = args.findIndex(x => x === param);
    if (module.exports [name] !== undefined) {
        let value = args[index + 1];
        if (value.toLowerCase().indexOf('true') > -1) {
            value = true;
        } else if (value.toLowerCase().indexOf('false') > -1) {
            value = false;
        }
        if (typeof value === 'string' && (value.indexOf('/') > -1 || value.indexOf('\\') > -1 ) ) {
            value = path.resolve(value);
        }
        module.exports [name] = value;
    }
};