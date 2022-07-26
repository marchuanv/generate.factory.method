const factory = require('./factory.js');
const { createMessageContent } = require('C:\\component\\lib\\factory\\messagecontent.factory.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { Message } = require('C:\\component\\lib\\message.js');
/**
* Create Message
* @param {recipientAddress,Id,data,messageContentSecurity,messageMetadata,messageStatus,senderAddress}
*/
function createMessage({recipientAddress,Id,data,messageContentSecurity,messageMetadata,messageStatus,senderAddress}) {
    const container = factory.createContainer({ type: Message, variableName:'message', singleton: false });
    container.config({recipientAddress,Id,data,messageContentSecurity,messageMetadata,messageStatus,senderAddress});
    container.config(createMessageContentMetadata({data}));
container.config(createMessageContent({data,messageContentSecurity}));
    container.complete();
    return container.references;
}
module.exports = { createMessage };
