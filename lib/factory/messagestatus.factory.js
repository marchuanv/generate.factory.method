const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messagestatus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageStatusFactoryContainer.singleton
* Create MessageStatus
* @param {messageStatusCode}
*/
function createMessageStatus({messageStatusCode}) {
    const ctorArgs = {messageStatusCode};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createMessageStatus };
