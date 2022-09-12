const { Factory } = require('../factory.js');
const factory = new Factory();

const { HttpClientStartMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstartmessagequeuebinding.prototype.js');
const getHttpClientStartMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\httpclientstartmessagequeuebinding.factory.config.js');
/**
* IsSingleton: true 
* Create HttpClientStartMessageQueueBinding 
* @param {scopeId,messageQueue}
*/
function createHttpClientStartMessageQueueBinding({scopeId,messageQueue}) {
    const container = factory.getContainer({ scopeId, type: HttpClientStartMessageQueueBinding, variableName:'httpClientStartMessageQueueBinding', singleton: true });
    container.config(getHttpClientStartMessageQueueBindingFactoryConfig());
    container.reference({messageQueue});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientStartMessageQueueBinding };
