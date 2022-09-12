const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerRequestMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverrequestmessagequeuebinding.js');
/**
* IsSingleton: false 
* Create HttpServerRequestMessageQueueBinding 
* @param {scopeId}
*/
function createHttpServerRequestMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpServerRequestMessageQueueBinding, variableName:'httpServerRequestMessageQueueBinding', singleton: false });
    container.config({});
    container.config(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerRequestMessageQueueBinding };
