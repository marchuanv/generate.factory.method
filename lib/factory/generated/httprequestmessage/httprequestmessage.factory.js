const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//httprequestmessage//httprequestmessage.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpRequestMessage
* @param {message,factoryContainerBindingName}
*/
function createHttpRequestMessage({message,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {message} });
}
module.exports = { createHttpRequestMessage };
