const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//httpclientrequestmessagequeuebinding//httpclientrequestmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpClientRequestMessageQueueBinding
* @param {messageQueue,factoryContainerBindingName}
*/
function createHttpClientRequestMessageQueueBinding({messageQueue,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageQueue} });
}
module.exports = { createHttpClientRequestMessageQueueBinding };
