const utils = require('utils');
const { UserIdentity } = require('./useridentity');
function Encryption ({ userIdentity }) {
    if (!(userIdentity instanceof UserIdentity)) {
        throw new Error('userIdentity is not an instance of the UserIdentity class.');
    }
    this.userIdentity = userIdentity;
    const hashedPassphrase = this.userIdentity.getHashedPassphrase();
    const { privateKey, publicKey } = utils.generatePublicPrivateKeys(hashedPassphrase);
    Object.defineProperty(this, 'getBase64RSAPublicKey', { writable: false, value: () => {
        return utils.stringToBase64(publicKey);
    }});
    Object.defineProperty(this, 'setRemoteRSAPublicKey', { writable: false, value: ({ base64RSAPublicKey }) => {
        Object.defineProperty(this, 'getRemoteRSAPublicKey', { writable: false, value: () => base64RSAPublicKey });
        Object.defineProperty(this, 'encryptObjectToJSON', { writable: false, value: ({ object }) => {
            const jsonStr = utils.getJSONString(object) || '{}';
            return utils.encryptToBase64Str(jsonStr, base64RSAPublicKey);
        }});
    }});
    Object.defineProperty(this, 'decryptJSONToObject', { writable: false, value: ({ encryptedJsonStr }) => {
        const hashedPassphrase = this.userIdentity.getHashedPassphrase();
        return utils.getJSONObject(utils.decryptFromBase64Str(encryptedJsonStr, privateKey, hashedPassphrase));
    }});
};
Encryption.prototype.getBase64RSAPublicKey = function() {}
Encryption.prototype.setRemoteRSAPublicKey = function({ base64RSAPublicKey }) {}
Encryption.prototype.getRemoteRSAPublicKey = function() {}
Encryption.prototype.encryptObjectToJSON = function({ object }) {}
Encryption.prototype.decryptJSONToObject = function({ encryptedJsonStr }) {}
module.exports = { Encryption };
