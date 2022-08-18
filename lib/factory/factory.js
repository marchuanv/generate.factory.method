const utils = require("utils");
function Factory() {
    const containers = {};
    Object.defineProperty(this, 'createContainer', { configurable: false, writable: false, value: ({ scopeId, type, variableName }) => {
        if (!scopeId) {
            throw new Error('Factory: no scopeId provided.');
        }
        containers[scopeId] = [];
        const scopeContainers = containers[scopeId];
        const container = { 
            references: {},
            Id: utils.generateGUID(),
            type,
            name: variableName,
            scopeId,
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
    Object.defineProperty(this, 'getContainer', { configurable: false, writable: false, value: ({ scopeId, type, variableName }) => {
        if (!scopeId) {
            throw new Error('Factory: no scopeId provided.');
        }
        if (!containers[scopeId]) {
            return null;
        }
        return containers[scopeId].find(c => c.name === variableName && c.type.name === type.name);
    }});
}
Factory.prototype.createContainer = function(type) {};
module.exports = new Factory();
