const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpserverstopmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerStopMessageQueueBindingFactoryContainer.singleton
* Create HttpServerStopMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpServerStopMessageQueueBinding({factoryContainerBindingName}) {
    const ctorArgs = {factoryContainerBindingName};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpServerStopMessageQueueBinding };
