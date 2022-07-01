const utils = require('utils');
const { HttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.js');
function HttpMessageHandlerFactory({ httpConnection,httpMessageQueue }) {
    utils.createProperty(this, 'create', () => {
        return new HttpMessageHandler({ httpConnection,httpMessageQueue });
    });
}
module.exports = { HttpMessageHandlerFactory };
