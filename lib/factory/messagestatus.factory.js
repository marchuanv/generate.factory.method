const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messagestatus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageStatusFactoryContainer.singleton
* Create MessageStatus
* @param {factoryContainerBindingName,messageStatusCode}
*/
function createMessageStatus({factoryContainerBindingName,messageStatusCode}) {
    const ctorArgs = {factoryContainerBindingName,messageStatusCode};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createMessageStatus };
