const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientStoppedMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstoppedmessagequeuebinding.prototype.js');
const getHttpClientStoppedMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\httpclientstoppedmessagequeuebinding.factory.config.js');
/**
* IsSingleton: true 
* Create HttpClientStoppedMessageQueueBinding 
* @param {scopeId}
*/
function createHttpClientStoppedMessageQueueBinding({scopeId}) {
    const container = factory.getContainer({ scopeId, type: HttpClientStoppedMessageQueueBinding, variableName:'httpClientStoppedMessageQueueBinding', singleton: true });
    container.config(getHttpClientStoppedMessageQueueBindingFactoryConfig());
    container.reference({});
        container.reference(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientStoppedMessageQueueBinding };
