const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerRequestMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverrequestmessagequeuebinding.prototype.js');
const getHttpServerRequestMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\httpserverrequestmessagequeuebinding.factory.config.js');
/**
* IsSingleton: false 
* Create HttpServerRequestMessageQueueBinding 
* @param {scopeId}
*/
function createHttpServerRequestMessageQueueBinding({scopeId}) {
    const container = factory.getContainer({ scopeId, type: HttpServerRequestMessageQueueBinding, variableName:'httpServerRequestMessageQueueBinding', singleton: false });
    container.config(getHttpServerRequestMessageQueueBindingFactoryConfig());
    container.reference({});
        container.reference(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerRequestMessageQueueBinding };
