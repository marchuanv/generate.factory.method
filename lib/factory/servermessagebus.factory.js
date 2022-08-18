const factory = require('./factory.js');
const { createMessageConverter } = require('C:\\component\\lib\\factory\\messageconverter.factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { createHttpServerMessageBus } = require('C:\\component\\lib\\factory\\httpservermessagebus.factory.js');
const { ServerMessageBus } = require('C:\\component\\lib\\servermessagebus.js');
/**
* IsSingleton: false 
* Create ServerMessageBus 
* @param {timeout,senderHost,senderPort}
*/
function createServerMessageBus({ scopeId, timeout,senderHost,senderPort }) {
    const container = factory.createContainer({ scopeId, type: ServerMessageBus, variableName:'serverMessageBus', singleton: false });
    container.config({timeout,senderHost,senderPort});
    container.config(createHttpServerMessageBus({timeout,senderHost,senderPort}));
container.config(createLogger({}));
container.config(createMessageQueue({}));
container.config(createMessageConverter({}));
    container.initialise();
    return container.references;
}
module.exports = { createServerMessageBus };
