const { createEncryption } = require('C:\\component\\lib\\factory\\encryption.factory.js');
const { createUserIdentity } = require('C:\\component\\lib\\factory\\useridentity.factory.js');
const { Content } = require('C:\\component\\lib\\content.js');
function createContent({userId,data,metadata}) {
    const userIdentity = createUserIdentity({userId});
const encryption = createEncryption({userIdentity});
    return new Content({encryption,data,metadata});
}
module.exports = { createContent };
