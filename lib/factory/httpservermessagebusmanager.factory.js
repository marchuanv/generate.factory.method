const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpservermessagebusmanager.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerMessageBusManagerFactoryContainer.singleton
* Create HttpServerMessageBusManager
* @param {factoryContainerBindingName}
*/
function createHttpServerMessageBusManager({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createHttpServerMessageBusManager };
