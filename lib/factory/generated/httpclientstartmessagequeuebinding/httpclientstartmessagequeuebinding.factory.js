const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//httpclientstartmessagequeuebinding//httpclientstartmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpClientStartMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientStartMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createHttpClientStartMessageQueueBinding };
