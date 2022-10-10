const { Factory } = require('../../factory.js');

/**
* Create HttpServerRequestMessageBus
* @param {factoryContainerBindingName}
*/
function createHttpServerRequestMessageBus({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//httpserverrequestmessagebus//httpserverrequestmessagebus.factory.container.multiplerequestsspec.binding.json`);
    const factory = new Factory(containerBinding);
    return factory.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpServerRequestMessageBus };
