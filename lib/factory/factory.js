const { FactoryContainer } = require('./factory.container');
function Factory() {
    const containers = [];
    Object.defineProperty(this, 'getContainer', { configurable: false, writable: false, value: ({ binding }) => {
        const { isSingleton } = binding;
        if (isSingleton) {
            const { defaultBindingFilePath } = binding;
            binding = require(defaultBindingFilePath);
        }
        const { bindingName, typeName } = binding;
        let existingContainer = containers.find(container => container.typeName === typeName && container.bindingName === bindingName && container.isBindingSingleton);
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