const { Factory } = require('../../factory.js');
const container = require('D://component//lib//factory//generated//clientmessagebus//clientmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create ClientMessageBus
* @param {factoryContainerBindingName}
*/
function createClientMessageBus({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createClientMessageBus };
