const factory = require('./factory.js');
const { createUserIdentity } = require('C:\\component\\lib\\factory\\useridentity.factory.js');
const { createMessageMetadata } = require('C:\\component\\lib\\factory\\messagemetadata.factory.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
const { MessageUserIdentity } = require('C:\\component\\lib\\messageuseridentity.js');
/**
* Create MessageUserIdentity
* @param {userId,metadata,data}
*/
function createMessageUserIdentity({userId,metadata,data}) {
    const container = factory.createContainer({ type: MessageUserIdentity, variableName:'messageUserIdentity', singleton: false });
    container.config({userId,metadata,data});
    container.config(createMessageContentMetadata({data}));
container.config(createMessageMetadata({metadata}));
container.config(createUserIdentity({userId}));
    container.complete();
    return container.references;
}
module.exports = { createMessageUserIdentity };
