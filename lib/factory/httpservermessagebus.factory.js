const factory = require('./factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createHttpServer } = require('C:\\component\\lib\\factory\\httpserver.factory.js');
const { HttpServerMessageBus } = require('C:\\component\\lib\\http\\httpservermessagebus.js');
/**
* IsSingleton: false 
* Create HttpServerMessageBus 
* @param {timeout,senderHost,senderPort}
*/
function createHttpServerMessageBus({ scopeId, timeout,senderHost,senderPort }) {
    const container = factory.createContainer({ scopeId, type: HttpServerMessageBus, variableName:'httpServerMessageBus', singleton: false });
    container.config({timeout,senderHost,senderPort});
    container.config(createHttpServer({timeout,senderHost,senderPort}));
container.config(createMessageQueue({}));
    container.initialise();
    return container.references;
}
module.exports = { createHttpServerMessageBus };
