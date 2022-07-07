
const { MessageQueue } = require('C:\\component\\lib\\messagequeue.js');
function createMessageQueue({}) {
    
    const messageQueue = new MessageQueue({});
    console.log('MessageQueueFactory: --> created MessageQueue');
    return {messageQueue};
}
module.exports = { createMessageQueue };
