const factory = require('./factory.js');
const { createHttpClientMessageQueue } = require('C:\\component\\lib\\factory\\httpclientmessagequeue.factory.js');
const { createHttpServerMessageQueue } = require('C:\\component\\lib\\factory\\httpservermessagequeue.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { HttpConnection } = require('C:\\component\\lib\\http\\httpconnection.js');
/**
* Create HttpConnection
* @param {timeout,messageQueueContextId,messageQueueTypeCode,senderHost,senderPort}
*/
function createHttpConnection({timeout,messageQueueContextId,messageQueueTypeCode,senderHost,senderPort}) {
    const container = factory.createContainer({ type: HttpConnection, variableName:'httpConnection', singleton: false });
    container.config({timeout,messageQueueContextId,messageQueueTypeCode,senderHost,senderPort});
    container.config(createSenderAddress({senderHost,senderPort}));
container.config(createHttpServerMessageQueue({messageQueueContextId,messageQueueTypeCode}));
container.config(createHttpClientMessageQueue({messageQueueContextId,messageQueueTypeCode}));
    container.complete();
    return container.references;
}
module.exports = { createHttpConnection };
