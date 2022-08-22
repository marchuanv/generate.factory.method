const factory = require('./factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { createMessageContent } = require('C:\\component\\lib\\factory\\messagecontent.factory.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { createMessageMetadata } = require('C:\\component\\lib\\factory\\messagemetadata.factory.js');
const { Message } = require('C:\\component\\lib\\message.js');
/**
* IsSingleton: false 
* Create Message 
* @param {scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessage({scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    let container = factory.getContainer({ scopeId, type: Message, variableName:'message', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: Message, variableName:'message', singleton: false });
        container.config({scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort});
            container.config(createMessageMetadata({scopeId,recipientHost,recipientPort,metadata,token,senderHost,senderPort}));
container.config(createMessageContentMetadata({scopeId,data}));
container.config(createMessageContent({scopeId,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}));
container.config(createMessageStatus({scopeId,messageStatusCode}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessage };
