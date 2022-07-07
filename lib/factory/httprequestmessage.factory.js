const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpRequestMessage } = require('C:\\component\\lib\\http\\httprequestmessage.js');
function createHttpRequestMessage({userId,data,metadata,code}) {
    const message = createMessage({userId,data,metadata,code});
    const httpRequestMessage = new HttpRequestMessage({message});
    return {message,httpRequestMessage};
}
module.exports = { createHttpRequestMessage };
