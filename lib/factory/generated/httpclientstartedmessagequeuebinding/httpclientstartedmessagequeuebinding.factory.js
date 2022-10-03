const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//httpclientstartedmessagequeuebinding//httpclientstartedmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpClientStartedMessageQueueBinding
* @param {messageQueue,factoryContainerBindingName}
*/
function createHttpClientStartedMessageQueueBinding({messageQueue,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageQueue} });
}
module.exports = { createHttpClientStartedMessageQueueBinding };
