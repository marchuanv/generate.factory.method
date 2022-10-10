const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//messagestatus//messagestatus.factory.container.default.binding.json');
const factory = new Factory(container);

/**
* Create MessageStatus
* @param {messageStatusCode,factoryContainerBindingName}
*/
function createMessageStatus({messageStatusCode,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageStatusCode} });
}
module.exports = { createMessageStatus };
