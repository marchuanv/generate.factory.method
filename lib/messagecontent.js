function MessageContent({ data, messageContentSecurity }) {
    if (messageContentSecurity.isUserAuthorised()) {
        const decryptedData = messageContentSecurity.encryptData({ data });
        const encryptedData = messageContentSecurity.decryptData({ data });
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
