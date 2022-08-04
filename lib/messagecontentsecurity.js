function MessageContentSecurity({ data, messageMetadata, messageContentMetadata }) {
    const { createEncryption } = require('./factory/encryption.factory.js');
    let { secret, remotebase64rsapublickey, userid } = messageMetadata;
    const { encryption, userIdentity } = createEncryption({ userId: userid });
    if (remotebase64rsapublickey) {
        const base64RSAPublicKey = remotebase64rsapublickey;
        userIdentity.setRemoteBase64RSAPublicKey({ base64RSAPublicKey });
    }
    if (userIdentity.isRegistered()) {
        userIdentity.authenticate({ secret });
    }
    const { contentType } = messageContentMetadata;
    Object.defineProperty(this, 'isUserAuthorised', { configurable: false, writable: false, value: () => {
        return userIdentity.isAuthorised();
    }});
    Object.defineProperty(this, 'decryptData', { configurable: false, writable: false, value: () => {
        if (messageContentMetadata.isEncrypted && contentType.name === 'base64Text') {
            return encryption.decryptJSONToObject({ encryptedJsonStr: data.replace('Encrypted:', '') });
        }
        return null;
    }});
    Object.defineProperty(this, 'encryptData', { configurable: false, writable: false, value: () => {
        if (messageContentMetadata.isEncrypted) {
            return data;
        }
        let object;
        if (contentType.name === 'json') {
            object = data;
        } else if (contentType.name === 'txt') {
            object = { text: data };
        } else {
            throw new Error(`failed to encrypt data, content type could not be determined.`);
        }
        const encryptedData = encryption.encryptObjectToJSON({ object });
        return `Encrypted:${encryptedData}`;
    }});
    Object.defineProperty(this, 'isEncryptedData', { configurable: false, writable: false, value: () => {
        return messageContentMetadata.isEncrypted
    }});
    Object.defineProperty(this, 'getUserId', { configurable: false, writable: false, value: () => {
        return userIdentity.getUserId();
    }});
}
MessageContentSecurity.prototype.isUserAuthorised = function() {};
MessageContentSecurity.prototype.decryptData = function() {};
MessageContentSecurity.prototype.encryptData = function() {};
MessageContentSecurity.prototype.isEncryptedData = function() {};
MessageContentSecurity.prototype.getUserId = function() {};
module.exports = { MessageContentSecurity };
