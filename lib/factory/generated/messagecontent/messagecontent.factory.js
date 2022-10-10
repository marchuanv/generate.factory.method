const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//messagecontent//messagecontent.factory.container.default.binding.json');
const factory = new Factory(container);

/**
* Create MessageContent
* @param {data,recipientHost,recipientPort,metadata,token,senderHost,senderPort,factoryContainerBindingName}
*/
function createMessageContent({data,recipientHost,recipientPort,metadata,token,senderHost,senderPort,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {data,recipientHost,recipientPort,metadata,token,senderHost,senderPort} });
}
module.exports = { createMessageContent };
