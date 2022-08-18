const utils = require("utils");
function Factory() {
    const containers = [];
    Object.defineProperty(this, 'createContainer', { configurable: false, writable: false, value: ({ scopeId, type, variableName, singleton }) => {
        const container = { 
            references: {},
            Id: utils.generateGUID(),
            type,
            name: variableName,
            singleton,
            scopeId,
            config: (reference) => {
                let object = reference.references ? reference.references : reference; 
                for(const key of Object.keys(object)) {
                    container.references[key] = object[key];
                }
            }, initialise: () => {
                const singletonRef = containers.find(c => c.name === variableName && c.scopeId === scopeId && c.Id !== container.Id && c.singleton === true);
                if (singletonRef) {
                    container.references[variableName] = singletonRef.references[variableName];
                } else {
                    container.references[variableName] = new type(container.references);
                }
            }
        };
        containers.push(container);
        return container;
    }});
}
Factory.prototype.createContainer = function(type) {};
module.exports = new Factory();
