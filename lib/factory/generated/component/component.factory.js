const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\component\\component.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: ComponentFactoryContainer.singleton
* Create Component
* @param {packageJson,factoryContainerBindingName,clientRequestMessageBus,clientResponseMessageBus,serverResponseMessageBus,serverRequestMessageBus}
*/
function createComponent({packageJson,factoryContainerBindingName,clientRequestMessageBus,clientResponseMessageBus,serverResponseMessageBus,serverRequestMessageBus}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {packageJson,factoryContainerBindingName,clientRequestMessageBus,clientResponseMessageBus,serverResponseMessageBus,serverRequestMessageBus} });
}
module.exports = { createComponent };
