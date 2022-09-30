const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//httpserverresponsemessagebus//httpserverresponsemessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpServerResponseMessageBus
* @param {factoryContainerBindingName}
*/
function createHttpServerResponseMessageBus({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createHttpServerResponseMessageBus };
