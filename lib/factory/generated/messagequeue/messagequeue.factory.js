const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//messagequeue//messagequeue.factory.container.default.binding.json');
const factory = new Factory(container);

/**
* Create MessageQueue
* @param {factoryContainerBindingName}
*/
function createMessageQueue({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createMessageQueue };
