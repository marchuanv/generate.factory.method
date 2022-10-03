const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//httpclientstartedmessagequeuebinding//httpclientstartedmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpClientStartedMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientStartedMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createHttpClientStartedMessageQueueBinding };
