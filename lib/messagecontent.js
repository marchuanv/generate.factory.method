const utils = require("utils");

function MessageContent({ data, messageContentSecurity, messageContentMetadata }) {
    if (messageContentSecurity.isUserAuthorised()) {
        let formattedData = data;
        const { contentType } = messageContentMetadata;
        if (contentType.name === 'txt') {
            formattedData = utils.getJSONString({ text: data });
        }
        const decryptedData = messageContentSecurity.decryptData({ data: formattedData });
        const encryptedData = messageContentSecurity.encryptData({ data: formattedData });
        Object.defineProperty(this, 'getDecryptedData', { configurable: false, writable: false, value: () => {
            return decryptedData;
        }});
        Object.defineProperty(this, 'getEncryptedData', { configurable: false, writable: false, value: () => {
            return encryptedData;
        }});
    } else {
        const userId = messageContentSecurity.getUserId();
        Object.defineProperty(this, 'getDecryptedData', { configurable: false, writable: false, value: () => {
            throw new Error(`'${userId}' is not authorised.`);
        }});
        Object.defineProperty(this, 'getEncryptedData', { configurable: false, writable: false, value: () => {
            throw new Error(`'${userId}' is not authorised.`);
        }});
    }
};
MessageContent.prototype.getEncryptedData = function() { };
MessageContent.prototype.getDecryptedData = function() { };
module.exports = { MessageContent };
