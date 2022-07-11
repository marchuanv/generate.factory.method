const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpRequestMessage } = require('C:\\component\\lib\\http\\httprequestmessage.js');
function createHttpRequestMessage({method,userId,data,metadata,messageStatusCode,path}) {
    const {message} = createMessage({userId,data,metadata,messageStatusCode});
    const httpRequestMessage = new HttpRequestMessage({method,message,path});
    return {message,httpRequestMessage};
}
module.exports = { createHttpRequestMessage };
