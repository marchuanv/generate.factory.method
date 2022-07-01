const utils = require('utils');
const { MessageStatus } = require('C:\\component\\lib\\messagestatus.js');
function MessageStatusFactory({ code }) {
    utils.createProperty(this, 'create', () => {
        return new MessageStatus({ code });
    });
}
module.exports = { MessageStatusFactory };
