function MessageContentSecurity({ data, messageMetadata, messageContentMetadata }) {
    const { createEncryption } = require('./factory/encryption.factory.js');
    let { secret, remotebase64rsapublickey, userid } = messageMetadata;
    createUserSession()
    const { encryption, userIdentity } = createUserSession  ({ userId: userid });
    if (userIdentity.isRegistered()) {
        userIdentity.authenticate({ secret });
    }
    if (remotebase64rsapublickey) {
        const base64RSAPublicKey = remotebase64rsapublickey;
        userIdentity.setRemoteBase64RSAPublicKey({ base64RSAPublicKey });
    } else { // most likely a request message
        const { base64RSAPublicKey } = userIdentity.getBase64KeyPair();
        messageMetadata.create({ name: 'remotebase64rsapublickey', value: base64RSAPublicKey });
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
