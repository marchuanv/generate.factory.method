const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//httpserverresponsemessagequeuebinding//httpserverresponsemessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpServerResponseMessageQueueBinding
* @param {messageQueue,factoryContainerBindingName}
*/
function createHttpServerResponseMessageQueueBinding({messageQueue,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageQueue} });
}
module.exports = { createHttpServerResponseMessageQueueBinding };
