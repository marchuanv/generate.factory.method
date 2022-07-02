const utils = require('utils');
const { HttpMessageStatus } = require('D:\\component\\lib\\http\\httpmessagestatus.js');
function HttpMessageStatusFactory({ messageStatus }) {
    utils.createProperty(this, 'create', () => {
        return new HttpMessageStatus({ messageStatus });
    });
}
module.exports = { HttpMessageStatusFactory };
