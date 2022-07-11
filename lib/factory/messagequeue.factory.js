
const { MessageQueue } = require('C:\\component\\lib\\messagequeue.js');
function createMessageQueue({userId}) {
    
    const messageQueue = new MessageQueue({userId});
    return {messageQueue};
}
module.exports = { createMessageQueue };
