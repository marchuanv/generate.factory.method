const { createContent } = require('C:\\component\\lib\\factory\\content.factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { Message } = require('C:\\component\\lib\\message.js');
function createMessage({userId,data,metadata,code}) {
    const messageStatus = createMessageStatus({code});
const content = createContent({userId,data,metadata});
    return new Message({content,messageStatus});
}
module.exports = { createMessage };
