const factory = require('./factory.js');

const { MessageContentMetadata } = require('C:\\component\\lib\\messagecontentmetadata.js');
/**
* Create MessageContentMetadata
* @param {data}
*/
function createMessageContentMetadata({data}) {
    const container = factory.createContainer({ type: MessageContentMetadata, variableName:'messageContentMetadata', singleton: false });
    container.config({data});
    
    container.complete();
    return container.references;
}
module.exports = { createMessageContentMetadata };
