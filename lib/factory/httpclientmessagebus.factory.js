const factory = require('./factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createMessageConverter } = require('C:\\component\\lib\\factory\\messageconverter.factory.js');
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { HttpClientMessageBus } = require('C:\\component\\lib\\http\\httpclientmessagebus.js');
/**
* IsSingleton: false 
* Create HttpClientMessageBus 
* @param {scopeId,timeout}
*/
function createHttpClientMessageBus({scopeId,timeout}) {
    let container = factory.getContainer({ scopeId, type: HttpClientMessageBus, variableName:'httpClientMessageBus' });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpClientMessageBus, variableName:'httpClientMessageBus', singleton: false });
        container.config({scopeId,timeout});
            container.config(createLogger({scopeId}));
container.config(createMessageConverter({scopeId}));
container.config(createMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientMessageBus };
