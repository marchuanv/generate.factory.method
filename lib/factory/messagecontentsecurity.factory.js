const factory = require('./factory.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { createMessageMetadata } = require('C:\\component\\lib\\factory\\messagemetadata.factory.js');
const { MessageContentSecurity } = require('C:\\component\\lib\\messagecontentsecurity.js');
/**
* Create MessageContentSecurity
* @param {data,metadata}
*/
function createMessageContentSecurity({data,metadata}) {
    const container = factory.createContainer({ type: MessageContentSecurity, variableName:'messageContentSecurity', singleton: false });
    container.config({data,metadata});
    container.config(createMessageMetadata({metadata}));
container.config(createMessageContentMetadata({data}));
    container.complete();
    return container.references;
}
module.exports = { createMessageContentSecurity };
