const utils = require("utils");
const containers = {};
function Factory() {
    Object.defineProperty(this, 'getInstance', { configurable: false, writable: false, value: ({ scopeId }, { bindings, type, variableName, singleton }) => {
        const { primitiveArgs, refArgs } = bindings[scopeId];
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
            references: refArgs,
            Id: utils.generateGUID(),
            type,
            name: variableName,
            scopeId: _scopeId,
            instance: null
        };
        console.log(`creating an instance of ${type.name} on the ${scopeId} scope.`);
        container.instance = new type(ctorArgs);
        scopeContainers.push(container);
        return container;
    }});
}
Factory.prototype.createContainer = function(type) {};
module.exports = { Factory };
