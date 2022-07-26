const factory = require('./factory.js');
const { createEncryption } = require('C:\\component\\lib\\factory\\encryption.factory.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { MessageContent } = require('C:\\component\\lib\\messagecontent.js');
/**
* Create MessageContent
* @param {userId,data}
*/
function createMessageContent({userId,data}) {
    const container = factory.createContainer({ type: MessageContent, variableName:'messageContent', singleton: false });
    container.config({userId,data});
    container.config(createMessageContentMetadata({data}));
container.config(createEncryption({userId}));
    container.complete();
    return container.references;
}
module.exports = { createMessageContent };
