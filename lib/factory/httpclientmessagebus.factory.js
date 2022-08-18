const factory = require('./factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createMessageConverter } = require('C:\\component\\lib\\factory\\messageconverter.factory.js');
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { HttpClientMessageBus } = require('C:\\component\\lib\\http\\httpclientmessagebus.js');
/**
* IsSingleton: false 
* Create HttpClientMessageBus 
* @param {timeout,contextId}
*/
function createHttpClientMessageBus({timeout,contextId}) {
    const container = factory.createContainer({ type: HttpClientMessageBus, variableName:'httpClientMessageBus', singleton: false });
    container.config({timeout,contextId});
    container.config(createLogger({}));
container.config(createMessageConverter({}));
container.config(createMessageQueue({}));
    container.initialise();
    return container.references;
}
module.exports = { createHttpClientMessageBus };
