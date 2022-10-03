const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//messagecontent//messagecontent.factory.container.json');
const factory = new Factory(container);

/**
* Create MessageContent
* @param {messageContentMetadata,data,userSessions,messageMetadata,factoryContainerBindingName}
*/
function createMessageContent({messageContentMetadata,data,userSessions,messageMetadata,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageContentMetadata,data,userSessions,messageMetadata} });
}
module.exports = { createMessageContent };
