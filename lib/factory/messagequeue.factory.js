
const { MessageQueue } = require('C:\\component\\lib\\messagequeue.js');
function createMessageQueue({userId}) {
    
    const messageQueue = new MessageQueue({userId});
    console.log('MessageQueueFactory: --> created MessageQueue');
    return {messageQueue};
}
module.exports = { createMessageQueue };
