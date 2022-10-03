const { Factory } = require('../../factory.js');
const container = require('D://component//lib//factory//generated//httpserverrequestmessagebus//httpserverrequestmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpServerRequestMessageBus
* @param {factoryContainerBindingName}
*/
function createHttpServerRequestMessageBus({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createHttpServerRequestMessageBus };
