const utils = require("utils");
function MessageContentSecurity({ data, messageMetadata, messageContentMetadata }) {
    const { createEncryption } = require('./factory/encryption.factory.js');
    let { secret, remotebase64rsapublickey, userid } = messageMetadata;
    const { encryption, userIdentity } = createEncryption({ userId: userid });
    if (remotebase64rsapublickey) {
        const base64RSAPublicKey = remotebase64rsapublickey;
        userIdentity.setRemoteBase64RSAPublicKey({ base64RSAPublicKey });
    }
    if (secret) {
        if (!userIdentity.authenticate({ secret })) {
            console.log(`authentication for ${userid} failed.`);
        }
    }
    const { contentType } = messageContentMetadata;
    Object.defineProperty(this, 'isUserAuthorised', { configurable: false, writable: false, value: () => {
        return userIdentity.isAuthorised();
    }});
    Object.defineProperty(this, 'decryptData', { configurable: false, writable: false, value: () => {
        if (contentType.name === 'base64Text') {
            return encryption.decryptJSONToObject({ encryptedJsonStr: data });
        }
    }});
    Object.defineProperty(this, 'encryptData', { configurable: false, writable: false, value: () => {
        if (messageContentMetadata.isEncrypted) {
            return data;
        }
        if (contentType.name === 'json') {
            return encryption.encryptObjectToJSON({ object: data });
        } else if (contentType.name === 'txt') {
            const object = { text: data };
            const encryptedData = encryption.encryptObjectToJSON({ object });
            return `Encrypted:${encryptedData}`;
        } else {
            throw new Error(`failed to encrypt data, content type could not be determined.`);
        }
    }});
    Object.defineProperty(this, 'getUserId', { configurable: false, writable: false, value: () => {
        return userIdentity.getUserId();
    }});
    Object.defineProperty(this, 'isDecryptedData', { configurable: false, writable: false, value: () => {
        return userIdentity.getUserId();
    }});
    Object.defineProperty(this, 'isEncryptedData', { configurable: false, writable: false, value: () => {
        return messageContentMetadata.isEncrypted
    }});
}
MessageContentSecurity.prototype.isUserAuthorised = function() {};
MessageContentSecurity.prototype.decryptData = function() {};
MessageContentSecurity.prototype.encryptData = function() {};
MessageContentSecurity.prototype.isDecryptedData = function() {};
MessageContentSecurity.prototype.isEncryptedData = function() {};
MessageContentSecurity.prototype.getUserId = function() {};
module.exports = { MessageContentSecurity };
