const { createEncryption } = require('C:\\component\\lib\\factory\\encryption.factory.js');
const { Content } = require('C:\\component\\lib\\content.js');
function createContent({userId,data,metadata}) {
    const encryption = createEncryption({userId});
    return new Content({encryption,data,metadata});
}
module.exports = { createContent };
