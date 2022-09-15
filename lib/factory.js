const path = require("path");
const utils = require("utils");
function Factory({ typeName, typeVariableName, typeScriptPath, bindings }) {
    Object.defineProperty(this, 'getInstance', { configurable: false, writable: false, value: ({ scopeId, type }) => {
        const _scopeId = isSingleton ? 'global' : scopeId;
        let binding = bindings.find(b => b.name === _scopeId);
        if (!binding) {
             throw new Error(`no binding found for: ${_scopeId}`);
        }
        const { bindingScriptPath } = binding;
        if (bindingScriptPath && !existSync(bindingScriptPath)) {
             throw new Error(`no script found for binding: ${_scopeId}`);
        } else if (bindingScriptPath) {
             binding = require(bindingScriptPath);
        } else {
             throw new Error(`no binding found for: ${_scopeId}`);
        }
        const { primitiveArgs, referenceArgs, instance } = binding;
        if (!instance) {
            const ctorArgs = primitiveArgs;
            for (const refArgName of Object.keys(referenceArgs)) {
                const refArg = referenceArgs[refArgName];
                const { factoryScriptPath, factoryMethod } = refArg;
                const script = require(factoryScriptPath);
                const func = script[factoryMethod];
                const instance = func(primitiveArgs);
                ctorArgs[refArgName] = instance;
            };
            let _type = type;
            if (!_type) {
                if (typeScriptPath && !existSync(typeScriptPath)) {
                    throw new Error(`no script found for type: ${typeName}`);
                } else if (typeScriptPath) {
                    const typeScript = require(typeScriptPath);
                    _type = typeScript[typeName];             
                    if (!_type) {
                       throw new Error(`could not find type; ${typeName}`);
                    }
                }
            }
            console.log(`creating an instance of ${typeName} on the ${scopeId} scope.`);
            instance[variableName] = new _type(ctorArgs);
        }
        return instance;
    }});
}
Factory.prototype.createContainer = function(type) {};
module.exports = { Factory };
