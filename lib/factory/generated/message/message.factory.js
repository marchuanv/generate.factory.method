const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//message//message.factory.container.json');
const factory = new Factory(container);

/**
* Create Message
* @param {Id,factoryContainerBindingName}
*/
function createMessage({Id,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {Id} });
}
module.exports = { createMessage };
