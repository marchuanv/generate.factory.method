const utils = require("utils");
const { FactoryContainer } = require('./factory.container.js');
function Factory() {
    const containers = [];
    Object.defineProperty(this, 'createContainer', { configurable: false, writable: false, value: ({ type, variableName }) => {
        const container = { 
            references: {},
            type,
            config: (reference) => {
                let object = reference.references ? reference.references : reference; 
                for(const key of Object.keys(object)) {
                    container.references[key] = object[key];
                }
            }, complete: () => {
                container.references[variableName] = new type(container.references);
            }
        };
        containers.push(container);
        return container;
    }});
}
Factory.prototype.createContainer = function(type) {};
module.exports = new Factory();
