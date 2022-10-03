const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//httpclientstartmessagequeuebinding//httpclientstartmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpClientStartMessageQueueBinding
* @param {messageQueue,factoryContainerBindingName}
*/
function createHttpClientStartMessageQueueBinding({messageQueue,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageQueue} });
}
module.exports = { createHttpClientStartMessageQueueBinding };
