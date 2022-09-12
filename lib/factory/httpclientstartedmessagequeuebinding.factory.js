const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientStartedMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstartedmessagequeuebinding.prototype.js');
const getHttpClientStartedMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\httpclientstartedmessagequeuebinding.factory.config.js');
/**
* IsSingleton: true 
* Create HttpClientStartedMessageQueueBinding 
* @param {scopeId}
*/
function createHttpClientStartedMessageQueueBinding({scopeId}) {
    const container = factory.getContainer({ scopeId, type: HttpClientStartedMessageQueueBinding, variableName:'httpClientStartedMessageQueueBinding', singleton: true });
    container.config(getHttpClientStartedMessageQueueBindingFactoryConfig());
    container.reference({});
        container.reference(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientStartedMessageQueueBinding };
