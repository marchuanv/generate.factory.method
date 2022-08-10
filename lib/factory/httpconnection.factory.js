const factory = require('./factory.js');
const { createHttpClientMessageQueue } = require('D:\\component\\lib\\factory\\httpclientmessagequeue.factory.js');
const { createHttpServerMessageQueue } = require('D:\\component\\lib\\factory\\httpservermessagequeue.factory.js');
const { createSenderAddress } = require('D:\\component\\lib\\factory\\senderaddress.factory.js');
const { HttpConnection } = require('D:\\component\\lib\\http\\httpconnection.js');
/**
* Create HttpConnection
* @param {timeout,messageQueueTypeCode,senderHost,senderPort}
*/
function createHttpConnection({timeout,messageQueueTypeCode,senderHost,senderPort}) {
    const container = factory.createContainer({ type: HttpConnection, variableName:'httpConnection', singleton: false });
    container.config({timeout,messageQueueTypeCode,senderHost,senderPort});
    container.config(createSenderAddress({senderHost,senderPort}));
container.config(createHttpServerMessageQueue({messageQueueTypeCode}));
container.config(createHttpClientMessageQueue({messageQueueTypeCode}));
    container.complete();
    return container.references;
}
module.exports = { createHttpConnection };
