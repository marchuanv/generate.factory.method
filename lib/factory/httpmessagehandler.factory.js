const { createHttpConnection } = require('C:\\component\\lib\\factory\\httpconnection.factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.js');
function createHttpMessageHandler({timeout,userId,hostAddress}) {
    const {messageQueue} = createMessageQueue({userId});
const {httpConnection} = createHttpConnection({timeout,userId,hostAddress});
    const httpMessageHandler = new HttpMessageHandler({httpConnection,messageQueue});
    return {httpConnection,messageQueue,httpMessageHandler};
}
module.exports = { createHttpMessageHandler };
