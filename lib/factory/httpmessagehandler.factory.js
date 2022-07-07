const { createHttpConnection } = require('C:\\component\\lib\\factory\\httpconnection.factory.js');
const { createHttpMessageQueue } = require('C:\\component\\lib\\factory\\httpmessagequeue.factory.js');
const { HttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.js');
function createHttpMessageHandler({timeout,hostAddress}) {
    const httpMessageQueue = createHttpMessageQueue({});
const httpConnection = createHttpConnection({timeout,hostAddress});
    return new HttpMessageHandler({httpConnection,httpMessageQueue});
}
module.exports = { createHttpMessageHandler };
