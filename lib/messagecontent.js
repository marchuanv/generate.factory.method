function MessageContent({ data, sharedUserSessions, messageMetadata, messageContentMetadata }) {

    const { secret, remotebase64rsapublickey, userid } = messageMetadata;
    const userId = userid;
    const remoteBase64RSAPublickey = remotebase64rsapublickey;
    const { userSecurity } = sharedUserSessions.ensureSession({ userId });

    if (secret && remoteBase64RSAPublickey) { //no need to authenticate again unless metadata states otherwise
        userSecurity.authenticate({ secret, remoteBase64RSAPublickey });
    }

    let decryptedData = null;
    let encryptedData = null;

    if (userSecurity.isAuthorised()) {
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
