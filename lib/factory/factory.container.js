const { existsSync } = require('fs');
const utils = require("utils");

function FactoryContainer({ bindingName, typeName,  typeVariableName, scriptPath, bindingFilePath, ctorParameters }) {
    const instances = {};
    Object.defineProperty(this, 'bindingName', { configurable: false, writable: false, value: bindingName });
    Object.defineProperty(this, 'typeName', { configurable: false, writable: false, value: typeName });
    Object.defineProperty(this, 'getInstance', { configurable: false, writable: false, value: ({ ctorArgs }) => {
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
        if (!existsSync(bindingFilePath)) {
            throw new Error(`"${bindingFilePath}" configuration does not exist.`);
        }
        if (!ctorParameters) {
            throw new Error(`"unable to find ctor parameters for binding: '${binding.bindingName}', type: "${typeName}".`);
        }
        if (instances[typeVariableName]) {
            result[typeVariableName] = instances[typeVariableName];
            return result;
        }
        console.log(`creating an instance of ${typeName} using ${bindingName} binding configuration.`);
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
                _ctorArguments[argName] = result[argName];
            } else {
                if (ctorArgs[argName] !== undefined) {
                    _ctorArguments[argName] = ctorArgs[argName];
                }
            }
        };
        if (!_ctorArguments.factoryContainerBindingName) {
            _ctorArguments.factoryContainerBindingName = binding.bindingName;
        }
        binding.instances[typeVariableName] = new Type(_ctorArguments);
        return binding.instances;
    }});
}
FactoryContainer.prototype.getInstance = function({ ctorArgs }) {};
FactoryContainer.prototype.bindingName = "";
FactoryContainer.prototype.typeName = "";
module.exports = { FactoryContainer };
