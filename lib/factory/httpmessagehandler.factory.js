const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.js');
function createHttpMessageHandler({userId}) {
    const {messageQueue} = createMessageQueue({userId});
    const httpMessageHandler = new HttpMessageHandler({messageQueue});
    return {messageQueue,httpMessageHandler};
}
module.exports = { createHttpMessageHandler };
