const factory = require('./factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { createMessageContent } = require('C:\\component\\lib\\factory\\messagecontent.factory.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { createMessageMetadata } = require('C:\\component\\lib\\factory\\messagemetadata.factory.js');
const { Message } = require('C:\\component\\lib\\message.js');
/**
* IsSingleton: false 
* Create Message 
* @param {messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessage({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const container = factory.createContainer({ type: Message, variableName:'message', singleton: false });
    container.config({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort});
    container.config(createMessageMetadata({recipientHost,recipientPort,metadata,token,senderHost,senderPort}));
container.config(createMessageContentMetadata({data}));
container.config(createMessageContent({data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}));
container.config(createMessageStatus({messageStatusCode}));
    container.initialise();
    return container.references;
}
module.exports = { createMessage };
