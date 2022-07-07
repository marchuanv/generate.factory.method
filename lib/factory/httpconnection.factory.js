const { HttpConnection } = require('C:\\component\\lib\\http\\httpconnection.js');
function createHttpConnection({ timeout,httpMessageQueue,hostAddress }) {
    return new HttpConnection({ timeout,httpMessageQueue,hostAddress });
}
module.exports = { createHttpConnection };
