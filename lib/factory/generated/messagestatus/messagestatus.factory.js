const { Factory } = require('../../factory.js');

/**
* Create MessageStatus
* @param {messageStatusCode,factoryContainerBindingName}
*/
function createMessageStatus({messageStatusCode,factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//messagestatus//messagestatus.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const factory = new Factory(containerBinding);
    return factory.getInstance({ ctorArgs: {messageStatusCode} });
}
module.exports = { createMessageStatus };
