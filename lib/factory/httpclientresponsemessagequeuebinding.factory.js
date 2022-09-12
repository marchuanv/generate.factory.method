const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientResponseMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientresponsemessagequeuebinding.prototype.js');
const getHttpClientResponseMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\httpclientresponsemessagequeuebinding.factory.config.js');
/**
* IsSingleton: false 
* Create HttpClientResponseMessageQueueBinding 
* @param {scopeId}
*/
function createHttpClientResponseMessageQueueBinding({scopeId}) {
    const container = factory.getContainer({ scopeId, type: HttpClientResponseMessageQueueBinding, variableName:'httpClientResponseMessageQueueBinding', singleton: false });
    container.config(getHttpClientResponseMessageQueueBindingFactoryConfig());
    container.reference({});
        container.reference(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientResponseMessageQueueBinding };
