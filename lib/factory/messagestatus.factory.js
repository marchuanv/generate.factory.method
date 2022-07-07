
const { MessageStatus } = require('C:\\component\\lib\\messagestatus.js');
function createMessageStatus({code}) {
    
    const messageStatus = new MessageStatus({code});
    return {messageStatus};
}
module.exports = { createMessageStatus };
