const utils = require("utils");
const { createUserIdentity } = require('./factory/useridentity.factory.js');
const { createEncryption } = require('./factory/encryption.factory.js');
function MessageContentSecurity({ data, messageMetadata, messageContentMetadata, userId }) {
    const origUserId = userId;
    let { secret, remotebase64rsapublickey } = messageMetadata;
    ({ userId } = messageMetadata);
    delete messageMetadata.userId;
    delete messageMetadata.secret;
    delete messageMetadata.remotebase64rsapublickey;
    userId = userId || origUserId;
    const { encryption, userIdentity } = createEncryption({ userId });
    if (userId && secret && remotebase64rsapublickey) {
        const remoteUserIdentity = createUserIdentity({ userId });
        if (remoteUserIdentity.isRegistered()) {
            if (remoteUserIdentity.authenticate({ secret })) {
                userIdentity = remoteUserIdentity;
                if (remotebase64rsapublickey) {
                    const base64RSAPublicKey = remotebase64rsapublickey;
                    userIdentity.setRemoteBase64RSAPublicKey({ base64RSAPublicKey });
                }
            } else {
                console.log(`authentication for ${userId} failed.`);
            }
        } else {
            console.log(`remote user: ${userId} is not registered.`);
        }
    }
    const { contentType } = messageContentMetadata;
    Object.defineProperty(this, 'isAuthorised', { configurable: false, writable: false, value: () => {
        return userIdentity.isAuthorised();
    }});
    Object.defineProperty(this, 'decryptData', { configurable: false, writable: false, value: () => {
        if (contentType === 'base64Text') {
            return encryption.decryptJSONToObject({ encryptedJsonStr: data });
        }
    }});
    Object.defineProperty(this, 'encryptData', { configurable: false, writable: false, value: () => {
        if (contentType === 'json') {
            return encryption.encryptObjectToJSON({ object: data });
        } else if (contentType === 'txt') {
            const object = { text: data };
            return encryption.encryptObjectToJSON({ object });
        } else {
            throw new Error(`failed to encrypt data, content type could not be determined.`);
        }
    }});
}
MessageContentSecurity.prototype.isUserAuthorised = function() {};
MessageContentSecurity.prototype.decryptData = function() {};
MessageContentSecurity.prototype.encryptData = function() {};
module.exports = { MessageContentSecurity };
