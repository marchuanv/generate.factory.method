const factory = require('./factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { MessageQueueBinder } = require('C:\\component\\lib\\messagequeuebinder.js');
/**
* IsSingleton: false 
* Create MessageQueueBinder 
* @param {scopeId}
*/
function createMessageQueueBinder({scopeId}) {
    let container = factory.getContainer({ scopeId, type: MessageQueueBinder, variableName:'messageQueueBinder', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: MessageQueueBinder, variableName:'messageQueueBinder', singleton: false });
        container.config({scopeId});
            container.config(createMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageQueueBinder };
