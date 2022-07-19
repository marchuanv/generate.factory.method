const factory = require('./factory.js');

const { MessageStatus } = require('C:\\component\\lib\\messagestatus.js');
function createMessageStatus({messageStatusCode}) {
    const container = factory.createContainer({ type: MessageStatus, variableName:'messageStatus' });
    container.config({messageStatusCode});
    
    container.complete();
    return container.references;
}
module.exports = { createMessageStatus };
