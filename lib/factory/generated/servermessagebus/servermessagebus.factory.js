const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//servermessagebus//servermessagebus.factory.container.default.binding.json');
const factory = new Factory(container);

/**
* Create ServerMessageBus
* @param {factoryContainerBindingName}
*/
function createServerMessageBus({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createServerMessageBus };
