
const { MessageQueue } = require('C:\\component\\lib\\messagequeue.js');
function createMessageQueue({}) {
    
    const messageQueue = new MessageQueue({});
    return {messageQueue};
}
module.exports = { createMessageQueue };
