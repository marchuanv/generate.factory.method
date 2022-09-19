const { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, appendFileSync } = require('fs');
const utils = require("utils");
function Factory({ typeName, isSingleton, bindings }) {
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
        if (!instance) {
            const ctorArgs = utils.getJSONObject(utils.getJSONString(primitiveArgs));
            for (const refArgName of Object.keys(referenceArgs)) {
                const refArg = referenceArgs[refArgName];
                const { factoryScriptPath, factoryMethod } = refArg;
                let script = typeof window === 'object' ? window : null;
                if (factoryScriptPath) {
                   if (!existsSync(factoryScriptPath) {
                      throw new Error(`"${factoryScriptPath}" script does not exist.`);
                   }
                   script = require(factoryScriptPath);
                } else if (!factoryMethod) {
                   throw new Error(`no factory method specified.`);
                }
                if (!script) {
                   throw new Error(`could not find script for ${factoryMethod}`);
                } 
                const func = script[factoryMethod];
                const instance = func(primitiveArgs);
                ctorArgs[refArgName] = instance;
            };
            let _type = this[typeName];
            if (!_type) {
                if (typeScriptPath && !existsSync(typeScriptPath)) {
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
