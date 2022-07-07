const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpResponseMessage } = require('C:\\component\\lib\\http\\httpresponsemessage.js');
function createHttpResponseMessage({userId,data,metadata,code}) {
    const message = createMessage({userId,data,metadata,code});
    const httpResponseMessage = new HttpResponseMessage({message});
    return {message,httpResponseMessage};
}
module.exports = { createHttpResponseMessage };
