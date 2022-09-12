const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerResponseMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverresponsemessagequeuebinding.js');
/**
* IsSingleton: false 
* Create HttpServerResponseMessageQueueBinding 
* @param {scopeId}
*/
function createHttpServerResponseMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpServerResponseMessageQueueBinding, variableName:'httpServerResponseMessageQueueBinding', singleton: false });
    container.config({});
    container.config(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerResponseMessageQueueBinding };
