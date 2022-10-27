const { FactoryContainer } = require('./factory.container');
function Factory() {
    const containers = [];
    Object.defineProperty(this, 'getContainer', { configurable: false, writable: false, value: ({ context }) => {
        const { isSingleton } = context;
        if (isSingleton) {
            const { defaultContextFilePath } = context;
            context = require(defaultContextFilePath);
        }
        const { contextName, typeName } = context;
        let existingContainer = containers.find(container => container.typeName === typeName && container.contextName === contextName && container.isContextSingleton);
        if (existingContainer) {
            return existingContainer;
        }
        const factoryContainer = new FactoryContainer(context);
        containers.push(factoryContainer);
        return factoryContainer;
    }});
}
Factory.prototype.getContainer = function({ context }) {};
const factory = new Factory();
module.exports = { factory };