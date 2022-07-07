const { HttpResponseMessage } = require('C:\\component\\lib\\http\\httpresponsemessage.js');
function createHttpResponseMessage({ message }) {
    return new HttpResponseMessage({ message });
}
module.exports = { createHttpResponseMessage };
