const factory = require('./factory.js');
const { createMessageConverter } = require('C:\\component\\lib\\factory\\messageconverter.factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { createHttpClientMessageBus } = require('C:\\component\\lib\\factory\\httpclientmessagebus.factory.js');
const { ClientMessageBus } = require('C:\\component\\lib\\clientmessagebus.js');
/**
* IsSingleton: false 
* Create ClientMessageBus 
* @param {timeout}
*/
function createClientMessageBus({ scopeId, timeout }) {
    const container = factory.createContainer({ scopeId, type: ClientMessageBus, variableName:'clientMessageBus', singleton: false });
    container.config({timeout});
    container.config(createHttpClientMessageBus({timeout}));
container.config(createLogger({}));
container.config(createMessageQueue({}));
container.config(createMessageConverter({}));
    container.initialise();
    return container.references;
}
module.exports = { createClientMessageBus };
