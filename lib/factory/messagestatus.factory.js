
const { MessageStatus } = require('C:\\component\\lib\\messagestatus.js');
function createMessageStatus({messageStatusCode}) {
    
    const messageStatus = new MessageStatus({messageStatusCode});
    console.log('MessageStatusFactory: --> created MessageStatus');
    return {messageStatus};
}
module.exports = { createMessageStatus };
