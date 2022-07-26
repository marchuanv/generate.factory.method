const factory = require('./factory.js');

const { MessageMetadata } = require('C:\\component\\lib\\messagemetadata.js');
/**
* Create MessageMetadata
* @param {metadata}
*/
function createMessageMetadata({metadata}) {
    const container = factory.createContainer({ type: MessageMetadata, variableName:'messageMetadata', singleton: false });
    container.config({metadata});
    
    container.complete();
    return container.references;
}
module.exports = { createMessageMetadata };
