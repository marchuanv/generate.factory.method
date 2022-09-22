const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\httpserverrequestmessagebus\\httpserverrequestmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerRequestMessageBusFactoryContainer.singleton
* Create HttpServerRequestMessageBus
* @param {factoryContainerBindingName}
*/
function createHttpServerRequestMessageBus({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createHttpServerRequestMessageBus };
