const { createEncryption } = require('C:\\component\\lib\\factory\\encryption.factory.js');
const { Content } = require('C:\\component\\lib\\content.js');
function createContent({userId,data,metadata}) {
    const {encryption} = createEncryption({userId});
    const content = new Content({encryption,data,metadata});
    console.log('ContentFactory: --> created Content');
    return {encryption,content};
}
module.exports = { createContent };
