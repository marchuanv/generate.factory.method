const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//httpclientstopmessagequeuebinding//httpclientstopmessagequeuebinding.factory.container.default.binding.json');
const factory = new Factory(container);

/**
* Create HttpClientStopMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientStopMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createHttpClientStopMessageQueueBinding };
