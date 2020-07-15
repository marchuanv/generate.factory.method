const utils = require('utils');
const { UserIdentity } = require('./useridentity');
function Encryption ({ userIdentity }) {
    if (userIdentity instanceof UserIdentity) {
        this.userIdentity = userIdentity;
        const hashedPassphrase = this.userIdentity.getHashedPassphrase();
        const { privateKey, publicKey } = utils.generatePublicPrivateKeys(hashedPassphrase);
        this.privateDecryptionKey = privateKey;
        this.publicEncryptionKey = publicKey;
    } else {
        throw new Error('userIdentity is not an instance of the UserIdentity class.');
    }
};
Encryption.prototype.getBase64RSAPublicKey = function() {
   return utils.stringToBase64(this.publicEncryptionKey);
}
Encryption.prototype.setRemoteRSAPublicKey = function({ base64RSAPublicKey }) {
    if (base64RSAPublicKey) {
        this.remoteRSAPublicKey = utils.base64ToString(base64RSAPublicKey);;
    } else {
        throw new Error('base64RSAPublicKey was not provided.');
    }
 }
Encryption.prototype.encryptObjectToJSON = function({ object }) {
    if (this.remoteRSAPublicKey) {
        const jsonStr = utils.getJSONString(object) || '{}';
        return utils.encryptToBase64Str(jsonStr, this.remoteRSAPublicKey);
    } else {
        throw new Error('no remoteRSAPublicKey exist to encrypt with.');
    }
}
Encryption.prototype.decryptJSONToObject = function({ encryptedJsonStr }) {
    const hashedPassphrase = this.userIdentity.getHashedPassphrase();
    return utils.getJSONObject(utils.decryptFromBase64Str(encryptedJsonStr, this.privateDecryptionKey, hashedPassphrase));
}
module.exports = { Encryption };
