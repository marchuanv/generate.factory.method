const factory = require('./factory.js');
const { createSharedMessageQueue } = require('D:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createSharedLogger } = require('D:\\component\\lib\\factory\\sharedlogger.factory.js');
const { createHttpClientMessageBus } = require('D:\\component\\lib\\factory\\httpclientmessagebus.factory.js');
const { createSharedMessageConverter } = require('D:\\component\\lib\\factory\\sharedmessageconverter.factory.js');
const { ClientMessageBus } = require('D:\\component\\lib\\clientmessagebus.js');
/**
* Create ClientMessageBus
* @param {contextId,timeout}
*/
function createClientMessageBus({contextId,timeout}) {
    const container = factory.createContainer({ type: ClientMessageBus, variableName:'clientMessageBus', singleton: false });
    container.config({contextId,timeout});
    container.config(createSharedMessageConverter({}));
container.config(createHttpClientMessageBus({timeout,contextId}));
container.config(createSharedLogger({}));
container.config(createSharedMessageQueue({}));
    container.complete();
    return container.references;
}
module.exports = { createClientMessageBus };
