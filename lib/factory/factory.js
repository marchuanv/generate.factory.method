const { FactoryContainer } = require('./factory.container');
function Factory() {
    const containers = [];
    Object.defineProperty(this, 'getContainer', { configurable: false, writable: false, value: ({ bindingFilePath, defaultBindingFilePath }) => {
        let binding = require(bindingFilePath);
        const defaultBinding = require(defaultBindingFilePath);
        binding = defaultBinding.isSingleton ? defaultBinding: binding;
        const { bindingName, typeName } = binding;
        let existingContainer = containers.find(container => container.bindingName === bindingName && container.typeName === typeName);
        if (existingContainer) {
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