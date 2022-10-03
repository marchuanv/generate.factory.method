const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//httpclientrequestmessagebus//httpclientrequestmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpClientRequestMessageBus
* @param {httpClientRequestMessageQueueBinding,factoryContainerBindingName}
*/
function createHttpClientRequestMessageBus({httpClientRequestMessageQueueBinding,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {httpClientRequestMessageQueueBinding} });
}
module.exports = { createHttpClientRequestMessageBus };
