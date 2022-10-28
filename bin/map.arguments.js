#!/usr/bin/env node
const path = require('path');
module.exports = {
    libGuid: null,
    scriptPath: null,
    prototypeScriptPath: null,
    isSingleton: null,
    isContextSingleton: null,
    scriptOutputDirPath: null,
    contextName: null,
    defaultContextName: null
};
process.argv.forEach( (param, index) => {
    const name = param.replace('--','');
    if (module.exports [name] !== undefined) {
        let value = process.argv[index + 1];
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
});
