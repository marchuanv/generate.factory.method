const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//httpclientresponsemessagebus//httpclientresponsemessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpClientResponseMessageBus
* @param {httpClientResponseMessageQueueBinding,factoryContainerBindingName}
*/
function createHttpClientResponseMessageBus({httpClientResponseMessageQueueBinding,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {httpClientResponseMessageQueueBinding} });
}
module.exports = { createHttpClientResponseMessageBus };
