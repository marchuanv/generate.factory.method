const factory = require('../factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { MessageQueueBinding } = require('C:\\component\\lib\\messagequeuebinding.js');
/**
* IsSingleton: false 
* Create MessageQueueBinding 
* @param {scopeId}
*/
function createMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: MessageQueueBinding, variableName:'messageQueueBinding', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: MessageQueueBinding, variableName:'messageQueueBinding', singleton: false });
        container.config({scopeId});
            container.config(createMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageQueueBinding };
