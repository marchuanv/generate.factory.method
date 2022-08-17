const factory = require('./factory.js');

const { MessageStatus } = require('D:\\component\\lib\\messagestatus.js');
/**
* Create MessageStatus
* @param {messageStatusCode}
*/
function createMessageStatus({messageStatusCode}) {
    const container = factory.createContainer({ type: MessageStatus, variableName:'messageStatus', singleton: false });
    container.config({messageStatusCode});
    
    container.complete();
    return container.references;
}
module.exports = { createMessageStatus };
