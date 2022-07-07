const { createHttpMessageQueue } = require('C:\\component\\lib\\factory\\httpmessagequeue.factory.js');
const { HttpConnection } = require('C:\\component\\lib\\http\\httpconnection.js');
function createHttpConnection({timeout,hostAddress}) {
    const {httpMessageQueue} = createHttpMessageQueue({});
    const httpConnection = new HttpConnection({timeout,httpMessageQueue,hostAddress});
    return {httpMessageQueue,httpConnection};
}
module.exports = { createHttpConnection };
