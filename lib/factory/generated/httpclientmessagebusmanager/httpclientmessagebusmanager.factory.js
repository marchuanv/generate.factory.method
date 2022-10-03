const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//httpclientmessagebusmanager//httpclientmessagebusmanager.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpClientMessageBusManager
* @param {factoryContainerBindingName}
*/
function createHttpClientMessageBusManager({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createHttpClientMessageBusManager };
