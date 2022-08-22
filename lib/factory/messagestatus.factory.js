const factory = require('./factory.js');

const { MessageStatus } = require('C:\\component\\lib\\messagestatus.js');
/**
* IsSingleton: false 
* Create MessageStatus 
* @param {scopeId,messageStatusCode}
*/
function createMessageStatus({scopeId,messageStatusCode}) {
    let container = factory.getContainer({ scopeId, type: MessageStatus, variableName:'messageStatus', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: MessageStatus, variableName:'messageStatus', singleton: false });
        container.config({scopeId,messageStatusCode});
            
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageStatus };
