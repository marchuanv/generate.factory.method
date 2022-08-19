const factory = require('./factory.js');
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { MessageQueue } = require('C:\\component\\lib\\messagequeue.js');
/**
* IsSingleton: false 
* Create MessageQueue 
* @param {scopeId}
*/
function createMessageQueue({scopeId}) {
    let container = factory.getContainer({ scopeId, type: MessageQueue, variableName:'messageQueue' });
    if (!container) {
        container = factory.createContainer({ scopeId, type: MessageQueue, variableName:'messageQueue', singleton: false });
        container.config({scopeId});
            container.config(createLogger({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageQueue };
