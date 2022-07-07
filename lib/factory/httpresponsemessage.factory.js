const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { createContent } = require('C:\\component\\lib\\factory\\content.factory.js');
const { createEncryption } = require('C:\\component\\lib\\factory\\encryption.factory.js');
const { createUserIdentity } = require('C:\\component\\lib\\factory\\useridentity.factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { HttpResponseMessage } = require('C:\\component\\lib\\http\\httpresponsemessage.js');
function createHttpResponseMessage({userId,data,metadata,code}) {
    const messageStatus = createMessageStatus({code});
const userIdentity = createUserIdentity({userId});
const encryption = createEncryption({userIdentity});
const content = createContent({encryption,data,metadata});
const message = createMessage({content,messageStatus});
    return new HttpResponseMessage({message});
}
module.exports = { createHttpResponseMessage };