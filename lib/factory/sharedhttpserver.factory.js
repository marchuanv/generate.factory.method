const factory = require('./factory.js');
const { createSenderAddress } = require('D:\\component\\lib\\factory\\senderaddress.factory.js');
const { createSharedLogger } = require('D:\\component\\lib\\factory\\sharedlogger.factory.js');
const { SharedHttpServer } = require('D:\\component\\lib\\http\\sharedhttpserver.js');
/**
* Create SharedHttpServer
* @param {timeout,senderHost,senderPort}
*/
function createSharedHttpServer({timeout,senderHost,senderPort}) {
    const container = factory.createContainer({ type: SharedHttpServer, variableName:'sharedHttpServer', singleton: true });
    container.config({timeout,senderHost,senderPort});
    container.config(createSharedLogger({}));
container.config(createSenderAddress({senderHost,senderPort}));
    container.complete();
    return container.references;
}
module.exports = { createSharedHttpServer };
