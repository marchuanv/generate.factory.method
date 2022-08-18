const factory = require('./factory.js');

const { MessageStatus } = require('C:\\component\\lib\\messagestatus.js');
/**
* IsSingleton: false 
* Create MessageStatus 
* @param {messageStatusCode}
*/
function createMessageStatus({ scopeId, messageStatusCode }) {
    const container = factory.createContainer({ scopeId, type: MessageStatus, variableName:'messageStatus', singleton: false });
    container.config({messageStatusCode});
    
    container.initialise();
    return container.references;
}
module.exports = { createMessageStatus };
