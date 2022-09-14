const path = require("path");
const utils = require("utils");
function Factory({ bindings, type, variableName, isSingleton }) {
    Object.defineProperty(this, 'getInstance', { configurable: false, writable: false, value: ({ scopeId }) => {
        const _scopeId = isSingleton ? 'global' : scopeId;
        const { primitiveArgs, referenceArgs, instance } = bindings[_scopeId];
        if (!instance[variableName]) {
            for (const refArg of Object.keys(referenceArgs)) {
                const { factoryScriptPath, factoryMethod } = refArg;
                const script = require(factoryScriptPath);
            };
            console.log(`creating an instance of ${type} on the ${scopeId} scope.`);
            instance[variableName] = new type(ctorArgs);
        }
        return instance;
    }});
}
Factory.prototype.createContainer = function(type) {};
module.exports = { Factory };
