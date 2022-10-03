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
     
        let binding = bindings[factoryContainerBindingName] || bindings["Global"];
        if (!binding) {
            throw new Error(`no binding found for "${factoryContainerBindingName}"`);
        }
        let { bindingFilePath, ctorParameters, instances } = binding;
        if (bindingFilePath) {
            if (!existsSync(bindingFilePath)) {
                throw new Error(`"${bindingFilePath}" configuration does not exist.`);
            }
            binding = require(bindingFilePath);
            ({ ctorParameters, instances } = binding);
        }
        console.log(`creating an instance of ${typeName} using ${binding.bindingName} binding configuration.`);
        if (!ctorParameters) {
            throw new Error(`"unable to find ctor parameters for binding: '${binding.bindingName}', type: "${typeName}".`);
        }
        if (instances[typeVariableName]) {
            result[typeVariableName] = instances[typeVariableName];
            return result;
        }
        const _ctorArguments = utils.getJSONObject(utils.getJSONString(ctorParameters));
        for (const argName of Object.keys(_ctorArguments)) {
            const { containerFilePath } = _ctorArguments[argName] || {};
            let depContainer = null;
            if (containerFilePath) {
                if (!existsSync(containerFilePath)) {
                    throw new Error(`"${containerFilePath}" file does not exist.`);
                }
                depContainer = require(containerFilePath);
            } 
            if (depContainer) {
                const factory = new Factory(depContainer);
                const result = factory.getInstance({ factoryContainerBindingName: binding.bindingName, ctorArgs });
                if (binding.bindingName === 'Global') {
                    const keys = Object.keys(result);
                    const lastKey = keys[keys.length -1];
                    _ctorArguments[argName] = result[lastKey];
                } else {
                    _ctorArguments[argName] = result[argName];
                }
            } else {
                if (ctorArgs[argName] !== undefined) {
                    _ctorArguments[argName] = ctorArgs[argName];
                }
            }
        };
        if (!_ctorArguments.factoryContainerBindingName) {
            _ctorArguments.factoryContainerBindingName = binding.bindingName;
        }
        if (binding.bindingName === 'Global') {
            const name = `${typeName}_${utils.generateGUID()}`;
            binding.instances[name] = new Type(_ctorArguments);
            console.log(`instance of ${typeName} created.`);
            return binding.instances;
        }
        binding.instances[typeVariableName] = new Type(_ctorArguments);
        console.log(`instance of ${typeName} created.`);
        return binding.instances;
    }});
}
Factory.prototype.createContainer = function(type) {};
module.exports = { Factory };
