const factory = require('./factory.js');
const { createSharedMessageQueue } = require('D:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createSharedMessageConverter } = require('D:\\component\\lib\\factory\\sharedmessageconverter.factory.js');
const { createSharedLogger } = require('D:\\component\\lib\\factory\\sharedlogger.factory.js');
const { HttpClientMessageBus } = require('D:\\component\\lib\\http\\httpclientmessagebus.js');
/**
* Create HttpClientMessageBus
* @param {timeout,contextId}
*/
function createHttpClientMessageBus({timeout,contextId}) {
    const container = factory.createContainer({ type: HttpClientMessageBus, variableName:'httpClientMessageBus', singleton: false });
    container.config({timeout,contextId});
    container.config(createSharedLogger({}));
container.config(createSharedMessageConverter({}));
container.config(createSharedMessageQueue({}));
    container.complete();
    return container.references;
}
module.exports = { createHttpClientMessageBus };
