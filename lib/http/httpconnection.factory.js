const utils = require('utils');
const { HttpConnection } = require('C:\\component\\lib\\http\\httpconnection.js');
function HttpConnectionFactory({ httpMessageQueue,hostAddress,timeout }) {
    utils.createProperty(this, 'create', () => {
        return new HttpConnection({ httpMessageQueue,hostAddress,timeout });
    });
}
module.exports = { HttpConnectionFactory };
