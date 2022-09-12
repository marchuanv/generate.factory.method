const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { createMessageContent } = require('C:\\component\\lib\\factory\\messagecontent.factory.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { createMessageMetadata } = require('C:\\component\\lib\\factory\\messagemetadata.factory.js');
const { Message } = require('C:\\component\\lib\\message.prototype.js');
const getMessageFactoryConfig = require('C:\\component\\lib\\factory\\message.factory.config.js');
/**
* IsSingleton: false 
* Create Message 
* @param {scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessage({scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const container = factory.getContainer({ scopeId, type: Message, variableName:'message', singleton: false });
    container.config(getMessageFactoryConfig());
    container.reference({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort});
        container.reference(createMessageMetadata({scopeId,recipientHost,recipientPort,metadata,token,senderHost,senderPort}));
container.reference(createMessageContentMetadata({scopeId,data}));
container.reference(createMessageContent({scopeId,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}));
container.reference(createMessageStatus({scopeId,messageStatusCode}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessage };
