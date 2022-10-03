const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//httpclientstopmessagequeuebinding//httpclientstopmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpClientStopMessageQueueBinding
* @param {messageQueue,factoryContainerBindingName}
*/
function createHttpClientStopMessageQueueBinding({messageQueue,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageQueue} });
}
module.exports = { createHttpClientStopMessageQueueBinding };
