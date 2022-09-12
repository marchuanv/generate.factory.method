const { Factory } = require('../factory.js');
const factory = new Factory();

const { MessageContentMetadata } = require('C:\\component\\lib\\messagecontentmetadata.js');
/**
* IsSingleton: false 
* Create MessageContentMetadata 
* @param {scopeId,data}
*/
function createMessageContentMetadata({scopeId,data}) {
    let container = factory.getContainer({ scopeId, type: MessageContentMetadata, variableName:'messageContentMetadata', singleton: false });
    container.config({data});
    
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageContentMetadata };
