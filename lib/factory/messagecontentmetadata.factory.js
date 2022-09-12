const { Factory } = require('../factory.js');
const factory = new Factory();

const { MessageContentMetadata } = require('C:\\component\\lib\\messagecontentmetadata.prototype.js');
const getMessageContentMetadataFactoryConfig = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.config.js');
/**
* IsSingleton: false 
* Create MessageContentMetadata 
* @param {scopeId,data}
*/
function createMessageContentMetadata({scopeId,data}) {
    const container = factory.getContainer({ scopeId, type: MessageContentMetadata, variableName:'messageContentMetadata', singleton: false });
    container.config(getMessageContentMetadataFactoryConfig());
    container.reference({data});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageContentMetadata };
