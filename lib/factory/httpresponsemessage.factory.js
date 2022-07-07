const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpResponseMessage } = require('C:\\component\\lib\\http\\httpresponsemessage.js');
function createHttpResponseMessage({userId,data,metadata,messageStatusCode}) {
    const {message} = createMessage({userId,data,metadata,messageStatusCode});
    const httpResponseMessage = new HttpResponseMessage({message});
    console.log('HttpResponseMessageFactory: --> created HttpResponseMessage');
    return {message,httpResponseMessage};
}
module.exports = { createHttpResponseMessage };
