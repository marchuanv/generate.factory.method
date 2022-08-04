function MessageContentSecurity({ data, messageMetadata, messageContentMetadata }) {
    const { createUserSession } = require('./factory/usersession.factory.js');
    let { secret, remotebase64rsapublickey, userid } = messageMetadata;
    const { userSession } = createUserSession({ userId: userid });
    const { userSecurity } = userSession.getUserSecurity();
    if (userSecurity.isRegistered() && secret) {
        userSecurity.authenticate({ secret });
    }
    if (remotebase64rsapublickey && !userIdentity.getRemoteBase64RSAPublicKey()) {
        const base64RSAPublicKey = remotebase64rsapublickey;
        userSecurity.setRemoteBase64RSAPublicKey({ base64RSAPublicKey });
    }
    const { contentType } = messageContentMetadata;
    Object.defineProperty(this, 'isUserAuthorised', { configurable: false, writable: false, value: () => {
        return userSecurity.isAuthorised();
    }});
    Object.defineProperty(this, 'decryptData', { configurable: false, writable: false, value: () => {
        if (messageContentMetadata.isEncrypted && contentType.name === 'base64Text') {
            return userSecurity.decryptJSONToObject({ encryptedJsonStr: data.replace('Encrypted:', '') });
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
        const encryptedData = userSecurity.encryptObjectToJSON({ object });
        return `Encrypted:${encryptedData}`;
    }});
    Object.defineProperty(this, 'isEncryptedData', { configurable: false, writable: false, value: () => {
        return messageContentMetadata.isEncrypted
    }});
    Object.defineProperty(this, 'getUserId', { configurable: false, writable: false, value: () => {
        return userSecurity.getUserId();
    }});
}
MessageContentSecurity.prototype.isUserAuthorised = function() {};
MessageContentSecurity.prototype.decryptData = function() {};
MessageContentSecurity.prototype.encryptData = function() {};
MessageContentSecurity.prototype.isEncryptedData = function() {};
MessageContentSecurity.prototype.getUserId = function() {};
module.exports = { MessageContentSecurity };
