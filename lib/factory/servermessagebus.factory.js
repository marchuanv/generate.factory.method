const factory = require('./factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { createHttpServerMessageBus } = require('C:\\component\\lib\\factory\\httpservermessagebus.factory.js');
const { createMessageConverter } = require('C:\\component\\lib\\factory\\messageconverter.factory.js');
const { ServerMessageBus } = require('C:\\component\\lib\\servermessagebus.js');
/**
* IsSingleton: false 
* Create ServerMessageBus 
* @param {contextId,timeout,senderHost,senderPort}
*/
function createServerMessageBus({contextId,timeout,senderHost,senderPort}) {
    const container = factory.createContainer({ type: ServerMessageBus, variableName:'serverMessageBus', singleton: false });
    container.config({contextId,timeout,senderHost,senderPort});
    container.config(createMessageConverter({}));
container.config(createHttpServerMessageBus({contextId,timeout,senderHost,senderPort}));
container.config(createLogger({}));
container.config(createMessageQueue({}));
    container.initialise();
    return container.references;
}
module.exports = { createServerMessageBus };
