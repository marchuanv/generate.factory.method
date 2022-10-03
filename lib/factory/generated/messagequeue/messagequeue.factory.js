const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//messagequeue//messagequeue.factory.container.json');
const factory = new Factory(container);

/**
* Create MessageQueue
* @param {logger,factoryContainerBindingName}
*/
function createMessageQueue({logger,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {logger} });
}
module.exports = { createMessageQueue };
