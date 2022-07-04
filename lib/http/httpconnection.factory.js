const { HttpConnection } = require('C:\\component\\lib\\http\\httpconnection.js');
function createHttpConnection({ httpMessageQueue,hostAddress,timeout }) {
    return new HttpConnection({ httpMessageQueue,hostAddress,timeout });
}
module.exports = { createHttpConnection };
