const factory = require('./factory.js');
const { createMessageConverter } = require('C:\\component\\lib\\factory\\messageconverter.factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { createHttpClientMessageBus } = require('C:\\component\\lib\\factory\\httpclientmessagebus.factory.js');
const { ClientMessageBus } = require('C:\\component\\lib\\clientmessagebus.js');
/**
* IsSingleton: false 
* Create ClientMessageBus 
* @param {scopeId,timeout}
*/
function createClientMessageBus({scopeId,timeout}) {
    let container = factory.getContainer({ scopeId, type: ClientMessageBus, variableName:'clientMessageBus' });
    if (!container) {
        container = factory.createContainer({ scopeId, type: ClientMessageBus, variableName:'clientMessageBus', singleton: false });
        container.config({scopeId,timeout});
            container.config(createHttpClientMessageBus({scopeId,timeout}));
container.config(createLogger({scopeId}));
container.config(createMessageQueue({scopeId}));
container.config(createMessageConverter({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createClientMessageBus };
