const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpRequestMessage } = require('C:\\component\\lib\\http\\httprequestmessage.js');
function createHttpRequestMessage({userId,data,metadata,code}) {
    const message = createMessage({userId,data,metadata,code});
    return new HttpRequestMessage({message});
}
module.exports = { createHttpRequestMessage };
