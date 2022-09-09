const utils = require("utils");
function MessageContent({ data, userSessions, messageMetadata, messageContentMetadata }) {
    const { token } = messageMetadata;
    const { userId } = utils.getJSONObject(utils.base64ToString(token));
    const { userSecurity } = userSessions.ensureSession({ userId });
    let decryptedData = null;
    let encryptedData = null;
    if (userSecurity.isAuthorised({ token })) {
        const { contentType, isEncrypted } = messageContentMetadata;
        if (isEncrypted && contentType.name === 'base64Text') {
            decryptedData = userSecurity.decryptJSONToObject({ encryptedJsonStr: data.replace('Encrypted:', '') });
            encryptedData = data;
        } else {
            let object = null;  
            if (typeof data === 'string') {
                if (contentType.name === 'txt') {
                    object = { text: data };
                }
            }
            encryptedData = userSecurity.encryptObjectToJSON({ object });
            decryptedData = userSecurity.decryptJSONToObject({ encryptedJsonStr: encryptedData });
            encryptedData = `Encrypted:${encryptedData}`;
            messageContentMetadata.setContentType({ name: 'txt' })
            messageContentMetadata.setContentLength({ length: Buffer.byteLength(encryptedData) });
        }
    } else {
        decryptedData = `unable to decrypt message content, '${userId}' user is not authorised.`;
        encryptedData = `unable to encrypt message content, '${userId}' user is not authorised.`;
    }
    Object.defineProperty(this, 'encryptedData', { configurable: false, writable: false, value: encryptedData });
    Object.defineProperty(this, 'decryptedData', { configurable: false, writable: false, value: decryptedData });
};
MessageContent.prototype.encryptedData = function() { };
MessageContent.prototype.decryptedData = function() { };
module.exports = { MessageContent };
