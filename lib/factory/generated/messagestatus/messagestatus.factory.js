const { factory } = require('../../factory.js');

/**
* Create MessageStatus
* @param {messageStatusCode,factoryContainerBindingName}
*/
function createMessageStatus({messageStatusCode,factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//messagestatus//messagestatus.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {messageStatusCode} });
}
module.exports = { createMessageStatus };
