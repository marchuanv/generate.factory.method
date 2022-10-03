const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//httpresponsemessage//httpresponsemessage.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpResponseMessage
* @param {message,factoryContainerBindingName}
*/
function createHttpResponseMessage({message,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {message} });
}
module.exports = { createHttpResponseMessage };
