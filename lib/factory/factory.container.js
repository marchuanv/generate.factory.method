const { existsSync } = require('fs');
const utils = require("utils");

function FactoryContainer({ contextName, typeName,  typeVariableName, scriptPath, isSingleton, isContextSingleton, contextFilePath, ctorParameters }) {
    const { factory } = require('./factory');
    let instance = {};
    Object.defineProperty(this, 'contextName', { configurable: false, writable: false, value: contextName });
    Object.defineProperty(this, 'typeName', { configurable: false, writable: false, value: typeName });
    Object.defineProperty(this, 'isSingleton', { configurable: false, writable: false, value: isSingleton });
    Object.defineProperty(this, 'isContextSingleton', { configurable: false, writable: false, value: isContextSingleton });
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
            try {
                script = require(scriptPath);
            } catch (err) {
                console.error(err);
            }
        }
        if (!script && scriptPath) {
            throw new Error(`failed to load: ${scriptPath}`);
        }
        const Type = script[typeName];
        if (!Type) {
            throw new Error(`${typeName} not found.`);
        }
        if (!existsSync(contextFilePath)) {
            throw new Error(`"${contextFilePath}" configuration does not exist.`);
        }
        if (!ctorParameters) {
            throw new Error(`"unable to find ctor parameters for context: '${context.contextName}', type: "${typeName}".`);
        }
     
        const _ctorArguments = utils.getJSONObject(utils.getJSONString(ctorParameters));
        for (const argName of Object.keys(_ctorArguments)) {
            let depContainer = null;
            { //scope
                const { contextFilePath } = _ctorArguments[argName] || {};
                if (contextFilePath) {
                    if (!existsSync(contextFilePath)) {
                        throw new Error(`"${contextFilePath}" file does not exist.`);
                    }
                    _contextFilePath = contextFilePath;
                    { //scope
                        let context;
                        try {
                            context = require(_contextFilePath);
                        } catch (err) {
                            console.error(err);
                        }
                        depContainer = factory.getContainer({ context });
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
        if (!_ctorArguments.contextName) {
            _ctorArguments.contextName = contextName;
        }
        instance[typeVariableName] = new Type(_ctorArguments);
        return instance;
    }});
}
FactoryContainer.prototype.getInstance = function({ ctorArgs }) {};
FactoryContainer.prototype.flush = function() {};
FactoryContainer.prototype.contextName = "";
FactoryContainer.prototype.typeName = "";
FactoryContainer.prototype.isSingleton = null;
FactoryContainer.prototype.isContextSingleton = null;
module.exports = { FactoryContainer };
