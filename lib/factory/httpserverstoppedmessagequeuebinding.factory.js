const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerStoppedMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverstoppedmessagequeuebinding.js');
/**
* IsSingleton: true 
* Create HttpServerStoppedMessageQueueBinding 
* @param {scopeId}
*/
function createHttpServerStoppedMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpServerStoppedMessageQueueBinding, variableName:'httpServerStoppedMessageQueueBinding', singleton: true });
    container.config({});
    container.config(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerStoppedMessageQueueBinding };
