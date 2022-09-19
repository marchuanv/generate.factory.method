const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\component.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: ComponentFactoryContainer.singleton
* Create Component
* @param {factoryContainerBindingName,packageJson,clientRequestMessageBus,clientResponseMessageBus,serverResponseMessageBus,serverRequestMessageBus}
*/
function createComponent({factoryContainerBindingName,packageJson,clientRequestMessageBus,clientResponseMessageBus,serverResponseMessageBus,serverRequestMessageBus}) {
    const ctorArgs = {factoryContainerBindingName,packageJson,clientRequestMessageBus,clientResponseMessageBus,serverResponseMessageBus,serverRequestMessageBus};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createComponent };
