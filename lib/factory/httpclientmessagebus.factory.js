const factory = require('./factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createMessageConverter } = require('C:\\component\\lib\\factory\\messageconverter.factory.js');
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { HttpClientMessageBus } = require('C:\\component\\lib\\http\\httpclientmessagebus.js');
/**
* IsSingleton: false 
* Create HttpClientMessageBus 
* @param {timeout}
*/
function createHttpClientMessageBus({ scopeId, timeout }) {
    const container = factory.createContainer({ scopeId, type: HttpClientMessageBus, variableName:'httpClientMessageBus', singleton: false });
    container.config({timeout});
    container.config(createLogger({}));
container.config(createMessageConverter({}));
container.config(createMessageQueue({}));
    container.initialise();
    return container.references;
}
module.exports = { createHttpClientMessageBus };
