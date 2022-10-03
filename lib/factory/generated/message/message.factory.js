const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//message//message.factory.container.json');
const factory = new Factory(container);

/**
* Create Message
* @param {messageStatus,Id,messageContent,messageContentMetadata,messageMetadata,factoryContainerBindingName}
*/
function createMessage({messageStatus,Id,messageContent,messageContentMetadata,messageMetadata,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageStatus,Id,messageContent,messageContentMetadata,messageMetadata} });
}
module.exports = { createMessage };
