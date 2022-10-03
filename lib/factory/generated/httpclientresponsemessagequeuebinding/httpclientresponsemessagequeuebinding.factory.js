const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//httpclientresponsemessagequeuebinding//httpclientresponsemessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpClientResponseMessageQueueBinding
* @param {messageQueue,factoryContainerBindingName}
*/
function createHttpClientResponseMessageQueueBinding({messageQueue,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageQueue} });
}
module.exports = { createHttpClientResponseMessageQueueBinding };
