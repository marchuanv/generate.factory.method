const { existsSync } = require('fs');
const utils = require("utils");

function Factory({ typeName, typeVariableName, scriptPath, isSingleton, bindings }) {
    Object.defineProperty(this, 'getInstance', { configurable: false, writable: false, value: ({ factoryContainerBindingName, ctorArgs }) => {
        const result = { };
        let script = typeof window === 'object' ? window : null;
        if (!script && scriptPath) {
            if (!existsSync(scriptPath)) {
                throw new Error(`"${scriptPath}" script does not exist.`);
            }
            script = require(scriptPath);
        }
        const Type = script[typeName];
        if (!Type) {
            throw new Error(`${typeName} not found.`);
        }
     
        let binding = bindings[factoryContainerBindingName];
        if (!binding) {
            throw new Error(`no binding found for "${factoryContainerBindingName}"`);
        }
        let { bindingFilePath, ctorParameters, instance } = binding;
        if (bindingFilePath) {
            if (!existsSync(bindingFilePath)) {
                throw new Error(`"${bindingFilePath}" configuration does not exist.`);
            }
            binding = require(bindingFilePath);
            ({ ctorParameters, instance } = binding);
        }
        if (!ctorParameters) {
            throw new Error(`"unable to find ctor parameters for binding: '${factoryContainerBindingName}', type: "${typeName}".`);
        }
        if (instance) {
            result[typeVariableName] = instance;
            return result;
        }
        const _ctorArgs = utils.getJSONObject(utils.getJSONString(ctorParameters));
        for(const key of Object.keys(_ctorArgs)) {
            _ctorArgs[key] = ctorArgs[key];
        };
        if (!_ctorArgs.factoryContainerBindingName) {
            _ctorArgs.factoryContainerBindingName = binding.bindingName;
        }
        for (const argName of Object.keys(ctorParameters)) {
            const { containerFilePath } = ctorParameters[argName] || {};
            let depContainer = null;
            if (containerFilePath) {
                if (!existsSync(containerFilePath)) {
                    throw new Error(`"${containerFilePath}" file does not exist.`);
                }
                depContainer = require(containerFilePath);
            } 
            if (depContainer) {
                const factory = new Factory(depContainer);
                const result = factory.getInstance({ factoryContainerBindingName, ctorArgs });
                _ctorArgs[argName] = result[argName];
            }
        };
        console.log(`creating an instance of ${typeName} for the ${factoryContainerBindingName} binding.`);
        binding.instance = new Type(_ctorArgs);
        result[typeVariableName] = binding.instance;
        return result;
    }});
}
Factory.prototype.createContainer = function(type) {};
module.exports = { Factory };
