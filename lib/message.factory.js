const utils = require('utils');
const { Message } = require('C:\\component\\lib\\message.js');
function MessageFactory({ content,messageStatus }) {
    utils.createProperty(this, 'create', () => {
        return new Message({ content,messageStatus });
    });
}
module.exports = { MessageFactory };