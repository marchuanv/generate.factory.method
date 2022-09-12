const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientStartMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstartmessagequeuebinding.prototype.js');
const getHttpClientStartMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\httpclientstartmessagequeuebinding.factory.config.js');
/**
* IsSingleton: true 
* Create HttpClientStartMessageQueueBinding 
* @param {scopeId}
*/
function createHttpClientStartMessageQueueBinding({scopeId}) {
    const container = factory.getContainer({ scopeId, type: HttpClientStartMessageQueueBinding, variableName:'httpClientStartMessageQueueBinding', singleton: true });
    container.config(getHttpClientStartMessageQueueBindingFactoryConfig());
    container.reference({});
        container.reference(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientStartMessageQueueBinding };
