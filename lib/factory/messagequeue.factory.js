const factory = require('./factory.js');
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { MessageQueue } = require('C:\\component\\lib\\messagequeue.js');
/**
* IsSingleton: true 
* Create MessageQueue 
* @param {}
*/
function createMessageQueue({ scopeId,  }) {
    const container = factory.createContainer({ scopeId, type: MessageQueue, variableName:'messageQueue', singleton: true });
    container.config({});
    container.config(createLogger({}));
    container.initialise();
    return container.references;
}
module.exports = { createMessageQueue };
