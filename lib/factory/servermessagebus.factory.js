const factory = require('./factory.js');
const { createSharedMessageQueue } = require('D:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createHttpServerMessageBus } = require('D:\\component\\lib\\factory\\httpservermessagebus.factory.js');
const { createSharedMessageConverter } = require('D:\\component\\lib\\factory\\sharedmessageconverter.factory.js');
const { ServerMessageBus } = require('D:\\component\\lib\\servermessagebus.js');
/**
* Create ServerMessageBus
* @param {contextId,sharedLogging,senderHost,senderPort,timeout}
*/
function createServerMessageBus({contextId,sharedLogging,senderHost,senderPort,timeout}) {
    const container = factory.createContainer({ type: ServerMessageBus, variableName:'serverMessageBus', singleton: false });
    container.config({contextId,sharedLogging,senderHost,senderPort,timeout});
    container.config(createSharedMessageConverter({}));
container.config(createHttpServerMessageBus({contextId,sharedLogging,senderHost,senderPort,timeout}));
container.config(createSharedMessageQueue({}));
    container.complete();
    return container.references;
}
module.exports = { createServerMessageBus };
