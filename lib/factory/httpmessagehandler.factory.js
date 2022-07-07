const { HttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.js');
function createHttpMessageHandler({timeout,hostAddress}) {

    return new HttpMessageHandler({httpConnection,httpMessageQueue});
}
module.exports = { createHttpMessageHandler };
