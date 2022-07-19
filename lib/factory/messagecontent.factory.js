const factory = require('./factory.js');
const { createEncryption } = require('C:\\component\\lib\\factory\\encryption.factory.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { MessageContent } = require('C:\\component\\lib\\messagecontent.js');
function createMessageContent({userId,data,senderHost,senderPort,token,metadata}) {
    const container = factory.createContainer({ type: MessageContent, variableName:'messageContent', singleton: false });
    container.config({userId,data,senderHost,senderPort,token,metadata});
    container.config(createMessageContentMetadata({data,senderHost,senderPort,token,metadata}));
container.config(createEncryption({userId}));
    container.complete();
    return container.references;
}
module.exports = { createMessageContent };
