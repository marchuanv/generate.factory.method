
const { MessageStatus } = require('C:\\component\\lib\\messagestatus.js');
function createMessageStatus({messageStatusCode}) {
    
    const messageStatus = new MessageStatus({messageStatusCode});
    return {messageStatus};
}
module.exports = { createMessageStatus };
