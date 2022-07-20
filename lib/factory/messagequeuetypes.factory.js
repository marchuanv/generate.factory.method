const factory = require('./factory.js');

const { MessageQueueTypes } = require('C:\\component\\lib\\messagequeuetypes.js');
/**
* Create MessageQueueTypes
* @param {}
*/
function createMessageQueueTypes({}) {
    const container = factory.createContainer({ type: MessageQueueTypes, variableName:'messageQueueTypes', singleton: false });
    container.config({});
    
    container.complete();
    return container.references;
}
module.exports = { createMessageQueueTypes };
