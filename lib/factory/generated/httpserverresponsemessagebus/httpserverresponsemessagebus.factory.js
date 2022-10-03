const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//httpserverresponsemessagebus//httpserverresponsemessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpServerResponseMessageBus
* @param {httpServerResponseMessageQueueBinding,factoryContainerBindingName}
*/
function createHttpServerResponseMessageBus({httpServerResponseMessageQueueBinding,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {httpServerResponseMessageQueueBinding} });
}
module.exports = { createHttpServerResponseMessageBus };
