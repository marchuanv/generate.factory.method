const utils = require('utils');
const { HttpConnection } = require('D:\\component\\lib\\http\\httpconnection.js');
function HttpConnectionFactory({ httpMessageQueue,hostAddress,timeout }) {
    utils.createProperty(this, 'create', () => {
        return new HttpConnection({ httpMessageQueue,hostAddress,timeout });
    });
}
module.exports = { HttpConnectionFactory };
