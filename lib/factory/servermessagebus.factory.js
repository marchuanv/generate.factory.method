const factory = require('./factory.js');
const { createSharedMessageQueue } = require('D:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createSharedLogger } = require('D:\\component\\lib\\factory\\sharedlogger.factory.js');
const { createHttpServerMessageBus } = require('D:\\component\\lib\\factory\\httpservermessagebus.factory.js');
const { createSharedMessageConverter } = require('D:\\component\\lib\\factory\\sharedmessageconverter.factory.js');
const { ServerMessageBus } = require('D:\\component\\lib\\servermessagebus.js');
/**
* Create ServerMessageBus
* @param {contextId,timeout,senderHost,senderPort}
*/
function createServerMessageBus({contextId,timeout,senderHost,senderPort}) {
    const container = factory.createContainer({ type: ServerMessageBus, variableName:'serverMessageBus', singleton: false });
    container.config({contextId,timeout,senderHost,senderPort});
    container.config(createSharedMessageConverter({}));
container.config(createHttpServerMessageBus({contextId,timeout,senderHost,senderPort}));
container.config(createSharedLogger({}));
container.config(createSharedMessageQueue({}));
    container.complete();
    return container.references;
}
module.exports = { createServerMessageBus };
