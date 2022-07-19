const utils = require("utils");
const { FactoryContainer } = require('./factory.container.js');
function Factory() {
    const containers = [];
    Object.defineProperty(this, 'createContainer', { configurable: false, writable: false, value: ({ type, variableName }) => {
        const references = {};
        return { config: (reference) => {
            for(const key of Object.keys(reference)) {
                references[key] = reference[key];
            }
        }, complete: () => {
            references[variableName] = new type(references);
            containers.push({ type, references });
        }};
    }});
}
Factory.prototype.createContainer = function(type) {};
module.exports = new Factory();
