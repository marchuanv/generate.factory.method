const factory = require('./factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { HttpServer } = require('C:\\component\\lib\\http\\httpserver.js');
/**
* IsSingleton: true 
* Create HttpServer 
* @param {scopeId,timeout,senderHost,senderPort}
*/
function createHttpServer({scopeId,timeout,senderHost,senderPort}) {
    let container = factory.getContainer({ scopeId, type: HttpServer, variableName:'httpServer' });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpServer, variableName:'httpServer', singleton: true });
        container.config({scopeId,timeout,senderHost,senderPort});
            container.config(createLogger({scopeId}));
container.config(createSenderAddress({scopeId,senderHost,senderPort}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServer };
