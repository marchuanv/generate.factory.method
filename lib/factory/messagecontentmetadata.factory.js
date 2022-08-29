const factory = require('../factory.js');

const { MessageContentMetadata } = require('C:\\component\\lib\\messagecontentmetadata.js');
/**
* IsSingleton: false 
* Create MessageContentMetadata 
* @param {scopeId,data}
*/
function createMessageContentMetadata({scopeId,data}) {
    let container = factory.getContainer({ scopeId, type: MessageContentMetadata, variableName:'messageContentMetadata', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: MessageContentMetadata, variableName:'messageContentMetadata', singleton: false });
        container.config({scopeId,data});
            
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageContentMetadata };
