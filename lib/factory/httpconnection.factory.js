const { createHttpMessageQueue } = require('C:\\component\\lib\\factory\\httpmessagequeue.factory.js');
const { HttpConnection } = require('C:\\component\\lib\\http\\httpconnection.js');
function createHttpConnection({timeout,hostAddress}) {
    const httpMessageQueue = createHttpMessageQueue({});
    return new HttpConnection({timeout,httpMessageQueue,hostAddress});
}
module.exports = { createHttpConnection };
