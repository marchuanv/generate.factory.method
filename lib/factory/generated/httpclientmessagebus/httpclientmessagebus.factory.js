const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//httpclientmessagebus//httpclientmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpClientMessageBus
* @param {timeout,factoryContainerBindingName}
*/
function createHttpClientMessageBus({timeout,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {timeout} });
}
module.exports = { createHttpClientMessageBus };
