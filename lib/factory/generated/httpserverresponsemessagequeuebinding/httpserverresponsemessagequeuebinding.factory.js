const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//httpserverresponsemessagequeuebinding//httpserverresponsemessagequeuebinding.factory.container.default.binding.json');
const factory = new Factory(container);

/**
* Create HttpServerResponseMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpServerResponseMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createHttpServerResponseMessageQueueBinding };
