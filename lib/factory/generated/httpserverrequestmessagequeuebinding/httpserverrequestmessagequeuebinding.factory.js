const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//httpserverrequestmessagequeuebinding//httpserverrequestmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpServerRequestMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpServerRequestMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createHttpServerRequestMessageQueueBinding };
