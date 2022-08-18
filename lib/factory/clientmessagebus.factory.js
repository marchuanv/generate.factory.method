const factory = require('./factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { createHttpClientMessageBus } = require('C:\\component\\lib\\factory\\httpclientmessagebus.factory.js');
const { createMessageConverter } = require('C:\\component\\lib\\factory\\messageconverter.factory.js');
const { ClientMessageBus } = require('C:\\component\\lib\\clientmessagebus.js');
/**
* IsSingleton: false 
* Create ClientMessageBus 
* @param {contextId,timeout}
*/
function createClientMessageBus({contextId,timeout}) {
    const container = factory.createContainer({ type: ClientMessageBus, variableName:'clientMessageBus', singleton: false });
    container.config({contextId,timeout});
    container.config(createMessageConverter({}));
container.config(createHttpClientMessageBus({timeout,contextId}));
container.config(createLogger({}));
container.config(createMessageQueue({}));
    container.initialise();
    return container.references;
}
module.exports = { createClientMessageBus };
