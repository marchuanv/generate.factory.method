const factory = require('./factory.js');

const { MessageQueueType } = require('D:\\component\\lib\\messagequeuetype.js');
/**
* Create MessageQueueType
* @param {messageQueueTypeCode}
*/
function createMessageQueueType({messageQueueTypeCode}) {
    const container = factory.createContainer({ type: MessageQueueType, variableName:'messageQueueType', singleton: false });
    container.config({messageQueueTypeCode});
    
    container.complete();
    return container.references;
}
module.exports = { createMessageQueueType };
