const utils = require("utils");
function Factory() {
    const containers = [];
    Object.defineProperty(this, 'createContainer', { configurable: false, writable: false, value: ({ type, variableName, singleton }) => {
        const container = { 
            references: {},
            Id: utils.generateGUID(),
            type,
            name: variableName,
            singleton,
            config: (reference) => {
                let object = reference.references ? reference.references : reference; 
                for(const key of Object.keys(object)) {
                    container.references[key] = object[key];
                }
            }, complete: () => {
                const singletonRef = containers.find(c => c.name === variableName && c.Id !== container.Id && c.singleton === true);
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
