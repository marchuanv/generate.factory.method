const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\messagestore\\messagestore.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageStoreFactoryContainer.singleton
* Create MessageStore
* @param {}
*/
function createMessageStore({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createMessageStore };
