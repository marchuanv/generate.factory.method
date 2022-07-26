const factory = require('./factory.js');
const { createUserIdentity } = require('C:\\component\\lib\\factory\\useridentity.factory.js');
const { createMessageMetadata } = require('C:\\component\\lib\\factory\\messagemetadata.factory.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { MessageContentSecurity } = require('C:\\component\\lib\\messagecontentsecurity.js');
/**
* Create MessageContentSecurity
* @param {userId,data,metadata}
*/
function createMessageContentSecurity({userId,data,metadata}) {
    const container = factory.createContainer({ type: MessageContentSecurity, variableName:'messageContentSecurity', singleton: false });
    container.config({userId,data,metadata});
    container.config(createMessageContentMetadata({data}));
container.config(createMessageMetadata({metadata}));
container.config(createUserIdentity({userId}));
    container.complete();
    return container.references;
}
module.exports = { createMessageContentSecurity };
