const { existsSync } = require('fs');
const utils = require("utils");
function Factory({ typeName, typeVariableName, typeScriptPath, isSingleton, bindings }) {
    Object.defineProperty(this, 'getInstance', { configurable: false, writable: false, value: ({ factoryContainerBindingName, ctorArgs }) => {
        const _factoryContainerBindingName = (isSingleton ? 'global' : factoryContainerBindingName) || 'nobinding';
        let binding = bindings.find(b => b.factoryContainerBindingName.toLowerCase() === _factoryContainerBindingName.toLowerCase());
        if (!binding) {
             throw new Error(`"${_factoryContainerBindingName}" binding not found for ${typeName}`);
        }
        let { factoryContainerBindingFilePath, primitiveArgs, referenceArgs, instance } = binding;
        if (factoryContainerBindingFilePath) {
            if (!existsSync(factoryContainerBindingFilePath)) {
                throw new Error(`"${factoryContainerBindingFilePath}" script does not exist.`);
            }
            binding = require(factoryContainerBindingFilePath);
            ({ primitiveArgs, referenceArgs, instance } = binding);
        }
        if (!primitiveArgs || !referenceArgs) {
            throw new Error(`"unable to find ${factoryContainerBindingName} binding for type: "${typeName}".`);
        }
        const result = {};
        if (instance) {
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
        const _ctorArgs = utils.getJSONObject(utils.getJSONString(primitiveArgs));
        _ctorArgs.factoryContainerBindingName = binding.factoryContainerBindingName;
        for(const key of Object.keys(_ctorArgs)) {
            _ctorArgs[key] = ctorArgs[key];
        };
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
            const result = factory.getInstance({ factoryContainerBindingName, ctorArgs });
            _ctorArgs[refArgName] = result[refArgName];
        };
        console.log(`creating an instance of ${typeName} for the ${factoryContainerBindingName} binding.`);
        binding.instance = new Type(_ctorArgs);
        result[typeVariableName] = binding.instance;
        return result;
    }});
}
Factory.prototype.createContainer = function(type) {};
module.exports = { Factory };
