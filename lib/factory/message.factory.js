const { Message } = require('C:\\component\\lib\\message.js');
function createMessage({ content,messageStatus }) {
    return new Message({ content,messageStatus });
}
module.exports = { createMessage };
