const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//httprequestmessage//httprequestmessage.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpRequestMessage
* @param {factoryContainerBindingName}
*/
function createHttpRequestMessage({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createHttpRequestMessage };
