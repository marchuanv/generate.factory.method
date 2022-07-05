const { HttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.js');
function createHttpMessageHandler({ httpConnection,httpMessageQueue }) {
    return new HttpMessageHandler({ httpConnection,httpMessageQueue });
}
module.exports = { createHttpMessageHandler };
