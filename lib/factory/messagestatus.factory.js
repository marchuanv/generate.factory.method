const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messagestatus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageStatusFactoryContainer.singleton
* Create MessageStatus
* @param {messageStatusCode}
*/
function createMessageStatus({messageStatusCode,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageStatusCode} });
}
module.exports = { createMessageStatus };
