const factory = require('./factory.js');

const { MessageContentMetadata } = require('C:\\component\\lib\\messagecontentmetadata.js');
/**
* IsSingleton: false 
* Create MessageContentMetadata 
* @param {data}
*/
function createMessageContentMetadata({ scopeId, data }) {
    const container = factory.createContainer({ scopeId, type: MessageContentMetadata, variableName:'messageContentMetadata', singleton: false });
    container.config({data});
    
    container.initialise();
    return container.references;
}
module.exports = { createMessageContentMetadata };
