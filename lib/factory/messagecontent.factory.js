const factory = require('./factory.js');
const { createMessageContentSecurity } = require('C:\\component\\lib\\factory\\messagecontentsecurity.factory.js');
const { MessageContent } = require('C:\\component\\lib\\messagecontent.js');
/**
* Create MessageContent
* @param {data,metadata}
*/
function createMessageContent({data,metadata}) {
    const container = factory.createContainer({ type: MessageContent, variableName:'messageContent', singleton: false });
    container.config({data,metadata});
    container.config(createMessageContentSecurity({data,metadata}));
    container.complete();
    return container.references;
}
module.exports = { createMessageContent };
