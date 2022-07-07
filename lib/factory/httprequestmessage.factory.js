const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { createContent } = require('C:\\component\\lib\\factory\\content.factory.js');
const { createEncryption } = require('C:\\component\\lib\\factory\\encryption.factory.js');
const { createUserIdentity } = require('C:\\component\\lib\\factory\\useridentity.factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { HttpRequestMessage } = require('C:\\component\\lib\\http\\httprequestmessage.js');
function createHttpRequestMessage({userId,data,metadata,code}) {
    const messageStatus = createMessageStatus({code});
const userIdentity = createUserIdentity({userId});
const encryption = createEncryption({userId});
const content = createContent({userId,data,metadata});
const message = createMessage({userId,data,metadata,code});
    return new HttpRequestMessage({message});
}
module.exports = { createHttpRequestMessage };
