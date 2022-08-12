const factory = require('./factory.js');
const { createSharedMessageQueue } = require('C:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createSharedMessageConverter } = require('C:\\component\\lib\\factory\\sharedmessageconverter.factory.js');
const { HttpClientMessageBus } = require('C:\\component\\lib\\http\\httpclientmessagebus.js');
/**
* Create HttpClientMessageBus
* @param {timeout,contextId}
*/
function createHttpClientMessageBus({timeout,contextId}) {
    const container = factory.createContainer({ type: HttpClientMessageBus, variableName:'httpClientMessageBus', singleton: false });
    container.config({timeout,contextId});
    container.config(createSharedMessageConverter({}));
container.config(createSharedMessageQueue({}));
    container.complete();
    return container.references;
}
module.exports = { createHttpClientMessageBus };
