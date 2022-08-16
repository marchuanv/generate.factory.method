const factory = require('./factory.js');
const { createSharedMessageQueue } = require('C:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createSharedLogger } = require('C:\\component\\lib\\factory\\sharedlogger.factory.js');
const { createHttpServerMessageBus } = require('C:\\component\\lib\\factory\\httpservermessagebus.factory.js');
const { createSharedMessageConverter } = require('C:\\component\\lib\\factory\\sharedmessageconverter.factory.js');
const { ServerMessageBus } = require('C:\\component\\lib\\servermessagebus.js');
/**
* Create ServerMessageBus
* @param {contextId,senderHost,senderPort,timeout}
*/
function createServerMessageBus({contextId,senderHost,senderPort,timeout}) {
    const container = factory.createContainer({ type: ServerMessageBus, variableName:'serverMessageBus', singleton: false });
    container.config({contextId,senderHost,senderPort,timeout});
    container.config(createSharedMessageConverter({}));
container.config(createHttpServerMessageBus({contextId,senderHost,senderPort,timeout}));
container.config(createSharedLogger({}));
container.config(createSharedMessageQueue({}));
    container.complete();
    return container.references;
}
module.exports = { createServerMessageBus };
