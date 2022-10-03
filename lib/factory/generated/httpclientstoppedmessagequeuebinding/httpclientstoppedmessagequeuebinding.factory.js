const { Factory } = require('../../factory.js');
const container = require('D://component//lib//factory//generated//httpclientstoppedmessagequeuebinding//httpclientstoppedmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpClientStoppedMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientStoppedMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createHttpClientStoppedMessageQueueBinding };
