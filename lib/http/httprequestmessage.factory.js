const utils = require('utils');
const { HttpRequestMessage } = require('C:\\component\\lib\\http\\httprequestmessage.js');
function HttpRequestMessageFactory({ message }) {
    utils.createProperty(this, 'create', () => {
        return new HttpRequestMessage({ message });
    });
}
module.exports = { HttpRequestMessageFactory };
