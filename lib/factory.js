const utils = require("utils");
const containers = {};
function Factory() {
    Object.defineProperty(this, 'getContainer', { configurable: false, writable: false, value: ({ scopeId, type, variableName, singleton }) => {
        const _scopeId = singleton ? 'global' : scopeId;
        if (!_scopeId) {
            throw new Error('Factory: no scopeId provided.');
        }
        let scopeContainers = containers[_scopeId];
        if (!scopeContainers) {
            scopeContainers = [];
            containers[_scopeId] = scopeContainers;
        }
        const existingScopeContainer = scopeContainers.find(c => c.name === variableName && c.type.name === type.name);
        if (existingScopeContainer) {
            return existingScopeContainer;
        }
        const container = { 
            references: {},
            Id: utils.generateGUID(),
            type,
            name: variableName,
            scopeId: _scopeId,
            config: (references) => {
                for(const key of Object.keys(references)) {
                    if (!container.references[key]) {
                        container.references[key] = references[key];
                    }
                }
            }, ensureInstance: () => {
                if (container.references[variableName]) {
                    return container.references[variableName];
                }
                const ctorArgs = { scopeId: container.scopeId };
                for(const key of Object.keys(container.references)) {
                    ctorArgs[key] = container.references[key];
                }
                console.log(`creating an instance of ${type.name} on the ${container.scopeId} scope.`);
                container.references[variableName] = new type(ctorArgs);
            }
        };
        scopeContainers.push(container);
        return container;
    }});
}
Factory.prototype.createContainer = function(type) {};
module.exports = { Factory };
