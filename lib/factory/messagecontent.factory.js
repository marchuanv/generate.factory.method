const factory = require('./factory.js');
const { createMessageContentSecurity } = require('C:\\component\\lib\\factory\\messagecontentsecurity.factory.js');
const { MessageContent } = require('C:\\component\\lib\\messagecontent.js');
/**
* Create MessageContent
* @param {data,userId,metadata}
*/
function createMessageContent({data,userId,metadata}) {
    const container = factory.createContainer({ type: MessageContent, variableName:'messageContent', singleton: false });
    container.config({data,userId,metadata});
    container.config(createMessageContentSecurity({userId,data,metadata}));
    container.complete();
    return container.references;
}
module.exports = { createMessageContent };
