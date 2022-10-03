const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//httpserverstopmessagequeuebinding//httpserverstopmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpServerStopMessageQueueBinding
* @param {messageQueue,factoryContainerBindingName}
*/
function createHttpServerStopMessageQueueBinding({messageQueue,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageQueue} });
}
module.exports = { createHttpServerStopMessageQueueBinding };
