const { existsSync } = require('fs');
const utils = require("utils");

function FactoryContainer({ bindingName, typeName,  typeVariableName, scriptPath, isSingleton, isBindingSingleton, bindingFilePath, ctorParameters }) {
    const { factory } = require('./factory');
    let instance = {};
    Object.defineProperty(this, 'bindingName', { configurable: false, writable: false, value: bindingName });
    Object.defineProperty(this, 'typeName', { configurable: false, writable: false, value: typeName });
    Object.defineProperty(this, 'isSingleton', { configurable: false, writable: false, value: isSingleton });
    Object.defineProperty(this, 'isBindingSingleton', { configurable: false, writable: false, value: isBindingSingleton });
    Object.defineProperty(this, 'flush', { configurable: false, writable: false, value: ({ ctorArgs }) => {
        instance = {};
    }});
    Object.defineProperty(this, 'getInstance', { configurable: false, writable: false, value: ({ ctorArgs }) => {
        if (instance[typeVariableName]) {
            return instance;
        }
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
     
        // console.log(`creating an instance of ${typeName} using ${bindingName} binding configuration.`);
        const _ctorArguments = utils.getJSONObject(utils.getJSONString(ctorParameters));
        for (const argName of Object.keys(_ctorArguments)) {
            let depContainer = null;
            { //scope
                const { bindingFilePath } = _ctorArguments[argName] || {};
                if (bindingFilePath) {
                    if (!existsSync(bindingFilePath)) {
                        throw new Error(`"${bindingFilePath}" file does not exist.`);
                    }
                    _bindingFilePath = bindingFilePath;
                    { //scope
                        const binding = require(_bindingFilePath);
                        depContainer = factory.getContainer({ binding });
                    }
                } 
            }            
            if (depContainer) {
                const result = depContainer.getInstance({ ctorArgs });
                _ctorArguments[argName] = result[argName];
            } else {
                if (ctorArgs[argName] !== undefined) {
                    _ctorArguments[argName] = ctorArgs[argName];
                }
            }
        };
        if (!_ctorArguments.factoryContainerBindingName) {
            _ctorArguments.factoryContainerBindingName = bindingName;
        }
        instance[typeVariableName] = new Type(_ctorArguments);
        return instance;
    }});
}
FactoryContainer.prototype.getInstance = function({ ctorArgs }) {};
FactoryContainer.prototype.flush = function() {};
FactoryContainer.prototype.bindingName = "";
FactoryContainer.prototype.typeName = "";
FactoryContainer.prototype.isSingleton = null;
FactoryContainer.prototype.isBindingSingleton = null;
module.exports = { FactoryContainer };
