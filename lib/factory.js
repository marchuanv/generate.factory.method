const utils = require("utils");
const containers = {};
function Factory() {
    Object.defineProperty(this, 'getContainer', { configurable: false, writable: false, value: ({ scopeId, type, variableName, singleton }) => {
        const _scopeId = singleton ? 'global' : scopeId;
        if (!_scopeId) {
            throw new Error('Factory: no scopeId provided.');
        }
        if (!containers[_scopeId]) {
            containers[_scopeId] = [];
        }
        const scopeContainers = containers[_scopeId];
        const container = { 
            references: {},
            Id: utils.generateGUID(),
            type,
            name: variableName,
            scopeId: _scopeId,
            config: (reference) => {
                let object = reference.references ? reference.references : reference; 
                for(const key of Object.keys(object)) {
                    container.references[key] = object[key];
                }
            }, ensureInstance: () => {
                if (container.references[variableName]) {
                    return container.references[variableName];
                }
                const ctorArgs = { scopeId: container.scopeId };
                for(const key of Object.keys(container.references)) {
                    ctorArgs[key] = container.references[key];
                }
                container.references[variableName] = new type(ctorArgs);
            }
        };
        scopeContainers.push(container);
        return container;
    }});
}
Factory.prototype.createContainer = function(type) {};
module.exports = { Factory };
