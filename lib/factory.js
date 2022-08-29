const utils = require("utils");
function Factory() {
    const containers = {};
    Object.defineProperty(this, 'createContainer', { configurable: false, writable: false, value: ({ scopeId, type, variableName, singleton }) => {
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
            _scopeId,
            config: (reference) => {
                let object = reference.references ? reference.references : reference; 
                for(const key of Object.keys(object)) {
                    container.references[key] = object[key];
                }
            }, ensureInstance: () => {
                if (container.references[variableName]) {
                    return container.references[variableName];
                }
                container.references[variableName] = new type(container.references);
            }
        };
        scopeContainers.push(container);
        return container;
    }});
    Object.defineProperty(this, 'getContainer', { configurable: false, writable: false, value: ({ scopeId, type, variableName, singleton }) => {
        const _scopeId = singleton ? 'global' : scopeId;
        if (!_scopeId) {
            throw new Error('Factory: no scopeId provided.');
        }
        if (!containers[_scopeId]) {
            return null;
        }
        return containers[_scopeId].find(c => c.name === variableName && c.type.name === type.name);
    }});
}
Factory.prototype.createContainer = function(type) {};
module.exports = new Factory();
