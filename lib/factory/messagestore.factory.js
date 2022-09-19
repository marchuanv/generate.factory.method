const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messagestore.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageStoreFactoryContainer.singleton
* Create MessageStore
* @param {factoryContainerBindingName}
*/
function createMessageStore({factoryContainerBindingName}) {
    const ctorArgs = {factoryContainerBindingName};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createMessageStore };
