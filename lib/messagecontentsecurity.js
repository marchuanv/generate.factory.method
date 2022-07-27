const { createEncryption } = require('./factory/encryption.factory.js');
function MessageContentSecurity({ data, messageMetadata, messageContentMetadata }) {
    let { secret, remotebase64rsapublickey, userid } = messageMetadata;
    delete messageMetadata.userid;
    delete messageMetadata.secret;
    delete messageMetadata.remotebase64rsapublickey;
    const { encryption, userIdentity } = createEncryption({ userId: userid });
    if (userid && secret && remotebase64rsapublickey) {
        if (remotebase64rsapublickey) {
            const base64RSAPublicKey = remotebase64rsapublickey;
            userIdentity.setRemoteBase64RSAPublicKey({ base64RSAPublicKey });
        }
        if (userIdentity.isRegistered()) {
            if (!userIdentity.authenticate({ secret })) {
                console.log(`authentication for ${userid} failed.`);
            }
        } else {
            console.log(`remote user: ${userid} is not registered.`);
        }
    } else {
        throw new Error(`MessageContentSecurity: userId, secret and remotebase64rsapublickey is required.`);
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
    Object.defineProperty(this, 'getUserId', { configurable: false, writable: false, value: () => {
        return userIdentity.getUserId();
    }});
}
MessageContentSecurity.prototype.isUserAuthorised = function() {};
MessageContentSecurity.prototype.decryptData = function() {};
MessageContentSecurity.prototype.encryptData = function() {};
MessageContentSecurity.prototype.getUserId = function() {};
module.exports = { MessageContentSecurity };
