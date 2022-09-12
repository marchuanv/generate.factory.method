const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerStartMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverstartmessagequeuebinding.js');
/**
* IsSingleton: true 
* Create HttpServerStartMessageQueueBinding 
* @param {scopeId}
*/
function createHttpServerStartMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpServerStartMessageQueueBinding, variableName:'httpServerStartMessageQueueBinding', singleton: true });
    container.config({});
    container.config(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerStartMessageQueueBinding };
