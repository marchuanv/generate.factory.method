const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//httpclientresponsemessagebus//httpclientresponsemessagebus.factory.container.default.binding.json');
const factory = new Factory(container);

/**
* Create HttpClientResponseMessageBus
* @param {factoryContainerBindingName}
*/
function createHttpClientResponseMessageBus({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createHttpClientResponseMessageBus };
