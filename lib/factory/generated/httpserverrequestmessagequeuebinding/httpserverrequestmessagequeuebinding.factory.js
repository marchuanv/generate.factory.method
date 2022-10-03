const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//httpserverrequestmessagequeuebinding//httpserverrequestmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpServerRequestMessageQueueBinding
* @param {messageQueue,factoryContainerBindingName}
*/
function createHttpServerRequestMessageQueueBinding({messageQueue,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageQueue} });
}
module.exports = { createHttpServerRequestMessageQueueBinding };
