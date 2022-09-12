const { Factory } = require('../factory.js');
const factory = new Factory();

const { HttpClientResponseMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientresponsemessagequeuebinding.prototype.js');
const getHttpClientResponseMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\httpclientresponsemessagequeuebinding.factory.config.js');
/**
* IsSingleton: false 
* Create HttpClientResponseMessageQueueBinding 
* @param {scopeId,messageQueue}
*/
function createHttpClientResponseMessageQueueBinding({scopeId,messageQueue}) {
    const container = factory.getContainer({ scopeId, type: HttpClientResponseMessageQueueBinding, variableName:'httpClientResponseMessageQueueBinding', singleton: false });
    container.config(getHttpClientResponseMessageQueueBindingFactoryConfig());
    container.reference({messageQueue});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientResponseMessageQueueBinding };
