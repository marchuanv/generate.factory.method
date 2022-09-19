const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpservermessagebusmanager.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerMessageBusManagerFactoryContainer.singleton
* Create HttpServerMessageBusManager
* @param {factoryContainerBindingName,scopeId}
*/
function createHttpServerMessageBusManager({factoryContainerBindingName,scopeId}) {
    const ctorArgs = {factoryContainerBindingName,scopeId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpServerMessageBusManager };
