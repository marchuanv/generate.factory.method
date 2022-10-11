const { Factory } = require('../../factory.js');

/**
* Create HttpClientRequestMessageBus
* @param {factoryContainerBindingName}
*/
function createHttpClientRequestMessageBus({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//httpclientrequestmessagebus//httpclientrequestmessagebus.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const factory = new Factory(containerBinding);
    return factory.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpClientRequestMessageBus };
