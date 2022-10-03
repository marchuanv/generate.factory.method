const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//httpclientstoppedmessagequeuebinding//httpclientstoppedmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpClientStoppedMessageQueueBinding
* @param {messageQueue,factoryContainerBindingName}
*/
function createHttpClientStoppedMessageQueueBinding({messageQueue,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageQueue} });
}
module.exports = { createHttpClientStoppedMessageQueueBinding };
