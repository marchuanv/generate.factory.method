const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\servermessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: ServerMessageBusFactoryContainer.singleton
* Create ServerMessageBus
* @param {factoryContainerBindingName,serverResponseMessageBus,serverRequestMessageBus}
*/
function createServerMessageBus({factoryContainerBindingName,serverResponseMessageBus,serverRequestMessageBus}) {
    const ctorArgs = {factoryContainerBindingName,serverResponseMessageBus,serverRequestMessageBus};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createServerMessageBus };
