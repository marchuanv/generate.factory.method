function MessageContent({ data, sharedUserSessions, messageMetadata, messageContentMetadata }) {

    const { secret, remotebase64rsapublickey, userid } = messageMetadata;
    const userId = userid;
    const remoteBase64RSAPublickey = remotebase64rsapublickey;
    const { userSecurity } = sharedUserSessions.ensureSession({ userId });

    if (secret && remoteBase64RSAPublickey) { //no need to authenticate again unless metadata states otherwise
        userSecurity.authenticate({ secret, remoteBase64RSAPublickey });
    }

    if (userSecurity.isAuthorised()) {
        
        const { contentType, isEncrypted } = messageContentMetadata;

        let decryptedData = null;
        let encryptedData = null;

        if (isEncrypted && contentType.name === 'base64Text') {
            decryptedData = userSecurity.decryptJSONToObject({ encryptedJsonStr: data.replace('Encrypted:', '') });
        } else {
            let object = null;  
            if (typeof data === 'string') {
                if (contentType.name === 'txt') {
                    object = { text: data };
                }
            }
            encryptedData = userSecurity.encryptObjectToJSON({ object });
            encryptedData = `Encrypted:${encryptedData}`;
        }
    
        Object.defineProperty(this, 'getDecryptedData', { configurable: false, writable: false, value: () => {
            return decryptedData;
        }});
        Object.defineProperty(this, 'getEncryptedData', { configurable: false, writable: false, value: () => {
            return encryptedData;
        }});

    } else {
        Object.defineProperty(this, 'getDecryptedData', { configurable: false, writable: false, value: () => {
            throw new Error(`unable to encrypt or decrypt message content, '${userId}' is not authorised.`);
        }});
        Object.defineProperty(this, 'getEncryptedData', { configurable: false, writable: false, value: () => {
            throw new Error(`unable to encrypt or decrypt message content, '${userId}' is not authorised.`);
        }});
    }
};
MessageContent.prototype.getEncryptedData = function() { };
MessageContent.prototype.getDecryptedData = function() { };
module.exports = { MessageContent };
