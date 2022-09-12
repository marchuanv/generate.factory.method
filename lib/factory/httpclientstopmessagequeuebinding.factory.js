const { Factory } = require('../factory.js');
const factory = new Factory();

const { HttpClientStopMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstopmessagequeuebinding.prototype.js');
const getHttpClientStopMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\httpclientstopmessagequeuebinding.factory.config.js');
/**
* IsSingleton: true 
* Create HttpClientStopMessageQueueBinding 
* @param {scopeId,messageQueue}
*/
function createHttpClientStopMessageQueueBinding({scopeId,messageQueue}) {
    const container = factory.getContainer({ scopeId, type: HttpClientStopMessageQueueBinding, variableName:'httpClientStopMessageQueueBinding', singleton: true });
    container.config(getHttpClientStopMessageQueueBindingFactoryConfig());
    container.reference({messageQueue});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientStopMessageQueueBinding };
