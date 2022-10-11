const { FactoryContainer } = require('./factory.container');
function Factory() {
    const containers = [];
    Object.defineProperty(this, 'getContainer', { configurable: false, writable: false, value: ({ binding }) => {
        const { isSingleton, bindingName, typeName } = binding;
        if (isSingleton) {
            const existingContainer = containers.find(container => container.bindingName === bindingName && container.typeName === typeName);
            if (existingContainer) {
                return existingContainer;
            }
            const factoryContainer = new FactoryContainer(binding);
            containers.push(factoryContainer);
            return factoryContainer;
        }
        const factoryContainer = new FactoryContainer(binding);
        return factoryContainer;
    }});
}
Factory.prototype.getContainer = function({ binding }) {};
const factory = new Factory();
module.exports = { factory };