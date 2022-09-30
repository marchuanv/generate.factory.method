const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//httpclientrequestmessagequeuebinding//httpclientrequestmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpClientRequestMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientRequestMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createHttpClientRequestMessageQueueBinding };
