const { createHttpConnection } = require('C:\\component\\lib\\factory\\httpconnection.factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.js');
function createHttpMessageHandler({timeout,hostAddress}) {
    const {messageQueue} = createMessageQueue({});
const {httpConnection} = createHttpConnection({timeout,hostAddress});
    const httpMessageHandler = new HttpMessageHandler({httpConnection,messageQueue});
    console.log('HttpMessageHandlerFactory: --> created HttpMessageHandler');
    return {httpConnection,messageQueue,httpMessageHandler};
}
module.exports = { createHttpMessageHandler };
