const utils = require('utils');
const { HttpMessageStatus } = require('C:\\component\\lib\\http\\httpmessagestatus.js');
function HttpMessageStatusFactory({ messageStatus }) {
    utils.createProperty(this, 'create', () => {
        return new HttpMessageStatus({ messageStatus });
    });
}
module.exports = { HttpMessageStatusFactory };
