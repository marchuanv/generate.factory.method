const factory = require('./factory.js');
const { createSharedMessageQueue } = require('C:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createHttpServerMessageBus } = require('C:\\component\\lib\\factory\\httpservermessagebus.factory.js');
const { ServerMessageBus } = require('C:\\component\\lib\\servermessagebus.js');
/**
* Create ServerMessageBus
* @param {contextId,senderHost,senderPort,timeout}
*/
function createServerMessageBus({contextId,senderHost,senderPort,timeout}) {
    const container = factory.createContainer({ type: ServerMessageBus, variableName:'serverMessageBus', singleton: false });
    container.config({contextId,senderHost,senderPort,timeout});
    container.config(createHttpServerMessageBus({contextId,senderHost,senderPort,timeout}));
container.config(createSharedMessageQueue({}));
    container.complete();
    return container.references;
}
module.exports = { createServerMessageBus };
