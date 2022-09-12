const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerStartedMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverstartedmessagequeuebinding.js');
/**
* IsSingleton: true 
* Create HttpServerStartedMessageQueueBinding 
* @param {scopeId}
*/
function createHttpServerStartedMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpServerStartedMessageQueueBinding, variableName:'httpServerStartedMessageQueueBinding', singleton: true });
    container.config({});
    container.config(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerStartedMessageQueueBinding };
