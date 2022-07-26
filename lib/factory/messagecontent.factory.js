const factory = require('./factory.js');

const { MessageContent } = require('C:\\component\\lib\\messagecontent.js');
/**
* Create MessageContent
* @param {data,messageContentSecurity}
*/
function createMessageContent({data,messageContentSecurity}) {
    const container = factory.createContainer({ type: MessageContent, variableName:'messageContent', singleton: false });
    container.config({data,messageContentSecurity});
    
    container.complete();
    return container.references;
}
module.exports = { createMessageContent };
