const { Factory } = require('../factory.js');
const factory = new Factory();
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { MessageQueue } = require('C:\\component\\lib\\messagequeue.js');
/**
* IsSingleton: true 
* Create MessageQueue 
* @param {scopeId}
*/
function createMessageQueue({scopeId}) {
    let container = factory.getContainer({ scopeId, type: MessageQueue, variableName:'messageQueue', singleton: true });
    container.config({});
    container.config(createLogger({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageQueue };
