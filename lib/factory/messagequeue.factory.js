const { Factory } = require('../factory.js');
const factory = new Factory();
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { MessageQueue } = require('C:\\component\\lib\\messagequeue.prototype.js');
const getMessageQueueFactoryConfig = require('C:\\component\\lib\\factory\\messagequeue.factory.config.js');
/**
* IsSingleton: true 
* Create MessageQueue 
* @param {scopeId}
*/
function createMessageQueue({scopeId}) {
    const container = factory.getContainer({ scopeId, type: MessageQueue, variableName:'messageQueue', singleton: true });
    container.config(getMessageQueueFactoryConfig());
    container.reference({});
        container.reference(createLogger({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageQueue };
