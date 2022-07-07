const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpConnection } = require('C:\\component\\lib\\http\\httpconnection.js');
function createHttpConnection({timeout,userId,hostAddress}) {
    const {messageQueue} = createMessageQueue({userId});
    const httpConnection = new HttpConnection({timeout,messageQueue,hostAddress});
    console.log('HttpConnectionFactory: --> created HttpConnection');
    return {messageQueue,httpConnection};
}
module.exports = { createHttpConnection };
