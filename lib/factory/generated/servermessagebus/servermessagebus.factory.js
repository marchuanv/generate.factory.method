const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//servermessagebus//servermessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create ServerMessageBus
* @param {serverResponseMessageBus,serverRequestMessageBus,factoryContainerBindingName}
*/
function createServerMessageBus({serverResponseMessageBus,serverRequestMessageBus,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {serverResponseMessageBus,serverRequestMessageBus} });
}
module.exports = { createServerMessageBus };
