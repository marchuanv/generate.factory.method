const { HttpRequestMessage } = require('C:\\component\\lib\\http\\httprequestmessage.js');
function createHttpRequestMessage({ message }) {
    return new HttpRequestMessage({ message });
}
module.exports = { createHttpRequestMessage };
