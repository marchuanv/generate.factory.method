const factory = require('./factory.js');

const { MessageQueueContext } = require('C:\\component\\lib\\messagequeuecontext.js');
/**
* IsSingleton: false 
* Create MessageQueueContext 
* @param {scopeId}
*/
function createMessageQueueContext({scopeId}) {
    let container = factory.getContainer({ scopeId, type: MessageQueueContext, variableName:'messageQueueContext', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: MessageQueueContext, variableName:'messageQueueContext', singleton: false });
        container.config({scopeId});
            
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageQueueContext };
