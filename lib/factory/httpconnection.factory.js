const { HttpConnection } = require('C:\\component\\lib\\http\\httpconnection.js');
function createHttpConnection({ httpMessageQueuehostAddress,timeout,httpMessageQueue,hostAddress }) {
    return new HttpConnection({ httpMessageQueuehostAddress,timeout,httpMessageQueue,hostAddress });
}
module.exports = { createHttpConnection };
