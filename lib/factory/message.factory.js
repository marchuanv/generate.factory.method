const { createContent } = require('C:\\component\\lib\\factory\\content.factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { Message } = require('C:\\component\\lib\\message.js');
function createMessage({userId,data,metadata,messageStatusCode}) {
    const {messageStatus} = createMessageStatus({messageStatusCode});
const {content} = createContent({userId,data,metadata});
    const message = new Message({content,messageStatus});
    console.log('MessageFactory: --> created Message');
    return {content,messageStatus,message};
}
module.exports = { createMessage };
