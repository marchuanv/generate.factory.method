const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//httpserverrequestmessagebus//httpserverrequestmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpServerRequestMessageBus
* @param {httpServerRequestMessageQueueBinding,factoryContainerBindingName}
*/
function createHttpServerRequestMessageBus({httpServerRequestMessageQueueBinding,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {httpServerRequestMessageQueueBinding} });
}
module.exports = { createHttpServerRequestMessageBus };
