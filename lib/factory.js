const path = require("path");
const utils = require("utils");
function Factory({ typeName, typeVariableName, typeScriptPath, bindings }) {
    Object.defineProperty(this, 'getInstance', { configurable: false, writable: false, value: ({ scopeId }) => {
        const _scopeId = (isSingleton ? 'global' : scopeId) || 'noscope';
        let binding = bindings.find(b => b.name === _scopeId);
        if (!binding) {
             throw new Error(`no binding found for: ${_scopeId}`);
        }
        let { bindingScriptPath, primitiveArgs, referenceArgs, instance } = binding;
        if (bindingScriptPath && !existSync(bindingScriptPath)) {
             throw new Error(`"${bindingScriptPath}" script does not exist.`);
        } else if (bindingScriptPath) {
             binding = require(bindingScriptPath);
        } else if ( !primitiveArgs || !referenceArgs ) {
             throw new Error(`no binding found for: ${_scopeId}`);
        }
        ({ primitiveArgs, referenceArgs, instance } = binding);
        if (!instance) {
            const ctorArgs = utils.getJSONObject(utils.getJSONString(primitiveArgs));
            for (const refArgName of Object.keys(referenceArgs)) {
                const refArg = referenceArgs[refArgName];
                const { factoryScriptPath, factoryMethod } = refArg;
                let script = this;
                if (factoryScriptPath && !existSync(factoryScriptPath)) {
                   throw new Error(`"${factoryScriptPath}" script does not exist.`);
                } else if (factoryScriptPath) {
                   script = require(factoryScriptPath);
                } else if ( !factoryMethod ) {
                   throw new Error(`no factory method specified.`);
                }
                const func = script[factoryMethod];
                const instance = func(primitiveArgs);
                ctorArgs[refArgName] = instance;
            };
            let _type = this[typeName];
            if (!_type) {
                if (typeScriptPath && !existSync(typeScriptPath)) {
                    throw new Error(`no script found for type: ${typeName}`);
                } else if (typeScriptPath) {
                    const typeScript = require(typeScriptPath);
                    _type = typeScript[typeName];                      
                } 
                if (!_type) {
                    throw new Error(`could not find type; ${typeName}`);
                }
            }
            console.log(`creating an instance of ${typeName} on the ${scopeId} scope.`);
            instance = new _type(ctorArgs);
        }
        return instance;
    }});
}
Factory.prototype.createContainer = function(type) {};
module.exports = { Factory };
