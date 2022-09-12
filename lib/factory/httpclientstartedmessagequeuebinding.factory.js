const { Factory } = require('../factory.js');
const factory = new Factory();

const { HttpClientStartedMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstartedmessagequeuebinding.prototype.js');
const getHttpClientStartedMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\httpclientstartedmessagequeuebinding.factory.config.js');
/**
* IsSingleton: true 
* Create HttpClientStartedMessageQueueBinding 
* @param {scopeId,messageQueue}
*/
function createHttpClientStartedMessageQueueBinding({scopeId,messageQueue}) {
    const container = factory.getContainer({ scopeId, type: HttpClientStartedMessageQueueBinding, variableName:'httpClientStartedMessageQueueBinding', singleton: true });
    container.config(getHttpClientStartedMessageQueueBindingFactoryConfig());
    container.reference({messageQueue});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientStartedMessageQueueBinding };
