const factory = require('./factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { HttpServer } = require('C:\\component\\lib\\http\\httpserver.js');
/**
* IsSingleton: true 
* Create HttpServer 
* @param {timeout,senderHost,senderPort}
*/
function createHttpServer({ scopeId, timeout,senderHost,senderPort }) {
    const container = factory.createContainer({ scopeId, type: HttpServer, variableName:'httpServer', singleton: true });
    container.config({timeout,senderHost,senderPort});
    container.config(createLogger({}));
container.config(createSenderAddress({senderHost,senderPort}));
    container.initialise();
    return container.references;
}
module.exports = { createHttpServer };
