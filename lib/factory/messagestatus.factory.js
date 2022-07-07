const { MessageStatus } = require('C:\\component\\lib\\messagestatus.js');
function createMessageStatus({code}) {

    return new MessageStatus({code});
}
module.exports = { createMessageStatus };
