const { Factory } = require('../factory.js');
const factory = new Factory();

const { HttpClientStoppedMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstoppedmessagequeuebinding.prototype.js');
const getHttpClientStoppedMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\httpclientstoppedmessagequeuebinding.factory.config.js');
/**
* IsSingleton: true 
* Create HttpClientStoppedMessageQueueBinding 
* @param {scopeId,messageQueue}
*/
function createHttpClientStoppedMessageQueueBinding({scopeId,messageQueue}) {
    const container = factory.getContainer({ scopeId, type: HttpClientStoppedMessageQueueBinding, variableName:'httpClientStoppedMessageQueueBinding', singleton: true });
    container.config(getHttpClientStoppedMessageQueueBindingFactoryConfig());
    container.reference({messageQueue});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientStoppedMessageQueueBinding };
