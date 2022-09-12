const { Factory } = require('../factory.js');
const factory = new Factory();

const { HttpClientRequestMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientrequestmessagequeuebinding.prototype.js');
const getHttpClientRequestMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\httpclientrequestmessagequeuebinding.factory.config.js');
/**
* IsSingleton: false 
* Create HttpClientRequestMessageQueueBinding 
* @param {scopeId,messageQueue}
*/
function createHttpClientRequestMessageQueueBinding({scopeId,messageQueue}) {
    const container = factory.getContainer({ scopeId, type: HttpClientRequestMessageQueueBinding, variableName:'httpClientRequestMessageQueueBinding', singleton: false });
    container.config(getHttpClientRequestMessageQueueBindingFactoryConfig());
    container.reference({messageQueue});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientRequestMessageQueueBinding };
