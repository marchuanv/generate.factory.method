const utils = require('utils');
const { HttpMessageHandler } = require('D:\\component\\lib\\http\\httpmessagehandler.js');
function HttpMessageHandlerFactory({ httpConnection,httpMessageQueue }) {
    utils.createProperty(this, 'create', () => {
        return new HttpMessageHandler({ httpConnection,httpMessageQueue });
    });
}
module.exports = { HttpMessageHandlerFactory };
