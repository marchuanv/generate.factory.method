const { FactoryContainer } = require('./factory.container');
function Factory() {
    const containers = [];
    Object.defineProperty(this, 'getContainer', { configurable: false, writable: false, value: ({ binding }) => {
        let { bindingName, defaultBindingName, defaultBindingFilePath, typeName, isSingleton } = binding;
        if (isSingleton) {
            binding = require(defaultBindingFilePath);
        }
        ({ bindingName, defaultBindingName, defaultBindingFilePath, typeName, isSingleton } = binding);
        let existingContainer = containers.find(container => container.typeName === typeName && container.bindingName === bindingName);
        if (existingContainer) {
            return existingContainer;
        }
        const factoryContainer = new FactoryContainer(binding);
        containers.push(factoryContainer);
        return factoryContainer;
    }});
}
Factory.prototype.getContainer = function({ bindingFilePath, defaultBindingFilePath }) {};
const factory = new Factory();
module.exports = { factory };