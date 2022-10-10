const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//httpclientrequestmessagebus//httpclientrequestmessagebus.factory.container.default.binding.json');
const factory = new Factory(container);

/**
* Create HttpClientRequestMessageBus
* @param {factoryContainerBindingName}
*/
function createHttpClientRequestMessageBus({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createHttpClientRequestMessageBus };
