const utils = require('utils');
const { HttpResponseMessage } = require('D:\\component\\lib\\http\\httpresponsemessage.js');
function HttpResponseMessageFactory({ message }) {
    utils.createProperty(this, 'create', () => {
        return new HttpResponseMessage({ message });
    });
}
module.exports = { HttpResponseMessageFactory };
