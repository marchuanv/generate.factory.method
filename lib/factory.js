const { existsSync } = require('fs');
const utils = require("utils");
function Factory({ typeName, typeVariableName, typeScriptPath, isSingleton, bindings }) {
    Object.defineProperty(this, 'getInstance', { configurable: false, writable: false, value: ({ scopeId }) => {
        const _scopeId = (isSingleton ? 'global' : scopeId) || 'noscope';
        let binding = bindings.find(b => b.name === _scopeId);
        if (!binding) {
             throw new Error(`no binding found for: ${_scopeId}`);
        }
        let { bindingScriptPath, primitiveArgs, referenceArgs, instance } = binding;
        if (bindingScriptPath) {
            if (!existsSync(bindingScriptPath)) {
                throw new Error(`"${bindingScriptPath}" script does not exist.`);
            }
            binding = require(bindingScriptPath);
            ({ primitiveArgs, referenceArgs, instance } = binding);
        }
        if (!primitiveArgs || !referenceArgs) {
            throw new Error(`"unable to find binding for type: "${typeName}", scopeId: "${scopeId}"`);
        }
        if (instance) {
            const result = {};
            result[typeVariableName] = instance;
            return result;
        }
        let script = typeof window === 'object' ? window : null;
        if (typeScriptPath) {
            if (!existsSync(typeScriptPath)) {
                throw new Error(`"${typeScriptPath}" script does not exist.`);
            }
            script = require(typeScriptPath);
        }
        const Type = script[typeName];
        if (!Type) {
            throw new Error(`${typeName} not found.`);
        }
        const ctorArgs = utils.getJSONObject(utils.getJSONString(primitiveArgs));
        for (const refArgName of Object.keys(referenceArgs)) {
            const refArg = referenceArgs[refArgName];
            const { factoryContainerName, factoryContainerFilePath } = refArg;
            let depContainer = null;
            if (factoryContainerFilePath) {
                if (!existsSync(factoryContainerFilePath)) {
                    throw new Error(`"${factoryContainerFilePath}" file does not exist.`);
                }
                depContainer = require(factoryContainerFilePath);
            } else if (!factoryContainerName) {
                throw new Error(`factoryContainerName not specified.`);
            }
            const factory = new Factory(depContainer);
            const result = factory.getInstance({ scopeId });
            ctorArgs[refArgName] = result[refArgName];
        };
        console.log(`creating an instance of ${typeName} on the ${scopeId} scope.`);
        binding.instance = new Type(ctorArgs);
        const result = {};
        result[typeVariableName] = binding.instance;
        return result;
    }});
}
Factory.prototype.createContainer = function(type) {};
module.exports = { Factory };
