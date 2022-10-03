const { Factory } = require('../../factory.js');
const container = require('D://component//lib//factory//generated//messagestatus//messagestatus.factory.container.json');
const factory = new Factory(container);

/**
* Create MessageStatus
* @param {messageStatusCode,factoryContainerBindingName}
*/
function createMessageStatus({messageStatusCode,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageStatusCode} });
}
module.exports = { createMessageStatus };
