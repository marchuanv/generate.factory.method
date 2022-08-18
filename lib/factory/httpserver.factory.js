const factory = require('./factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { HttpServer } = require('C:\\component\\lib\\http\\httpserver.js');
/**
* Create HttpServer
* @param {timeout,senderHost,senderPort}
*/
function createHttpServer({timeout,senderHost,senderPort}) {
    const container = factory.createContainer({ type: HttpServer, variableName:'httpServer', singleton: false });
    container.config({timeout,senderHost,senderPort});
    container.config(createLogger({}));
container.config(createSenderAddress({senderHost,senderPort}));
    container.complete();
    return container.references;
}
module.exports = { createHttpServer };
