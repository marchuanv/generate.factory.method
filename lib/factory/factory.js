const { FactoryContainer } = require('./factory.container');
function Factory() {
    const containers = [];
    Object.defineProperty(this, 'getContainer', { configurable: false, writable: false, value: ({ binding }) => {
        const { isSingleton, typeName } = binding;
        const existingContainer = containers.find(container => container.isSingleton && container.typeName === typeName);
        if (isSingleton && existingContainer) {
            return existingContainer;
        }
        const factoryContainer = new FactoryContainer(binding);
        containers.push(factoryContainer);
        return factoryContainer;
    }});
}
Factory.prototype.getContainer = function({ binding }) {};
const factory = new Factory();
module.exports = { factory };