const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//servermessagebus//servermessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create ServerMessageBus
* @param {messageConverter,serverResponseMessageBus,serverRequestMessageBus,factoryContainerBindingName}
*/
function createServerMessageBus({messageConverter,serverResponseMessageBus,serverRequestMessageBus,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageConverter,serverResponseMessageBus,serverRequestMessageBus} });
}
module.exports = { createServerMessageBus };
