const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpRequestMessage } = require('C:\\component\\lib\\http\\httprequestmessage.js');
function createHttpRequestMessage({userId,data,metadata,messageStatusCode}) {
    const {message} = createMessage({userId,data,metadata,messageStatusCode});
    const httpRequestMessage = new HttpRequestMessage({message});
    return {message,httpRequestMessage};
}
module.exports = { createHttpRequestMessage };
