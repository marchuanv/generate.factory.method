const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//httpserverstopmessagequeuebinding//httpserverstopmessagequeuebinding.factory.container.default.binding.json');
const factory = new Factory(container);

/**
* Create HttpServerStopMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpServerStopMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createHttpServerStopMessageQueueBinding };
