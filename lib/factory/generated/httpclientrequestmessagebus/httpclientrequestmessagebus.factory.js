const { Factory } = require('../../factory.js');
const container = require('D://component//lib//factory//generated//httpclientrequestmessagebus//httpclientrequestmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpClientRequestMessageBus
* @param {factoryContainerBindingName}
*/
function createHttpClientRequestMessageBus({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createHttpClientRequestMessageBus };
