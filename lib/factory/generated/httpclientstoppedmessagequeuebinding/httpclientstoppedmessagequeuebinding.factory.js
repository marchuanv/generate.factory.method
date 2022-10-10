const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//httpclientstoppedmessagequeuebinding//httpclientstoppedmessagequeuebinding.factory.container.default.binding.json');
const factory = new Factory(container);

/**
* Create HttpClientStoppedMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientStoppedMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createHttpClientStoppedMessageQueueBinding };
