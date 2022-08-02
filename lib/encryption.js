const utils = require('utils');

function Encryption({ userIdentity }) {
    if (userIdentity.isRegistered()) {
        const hashedPassphrase = userIdentity.getHashedPassphrase();
        const { privateKey, publicKey } = userIdentity.getKeyPair();
        Object.defineProperty(this, 'getBase64RSAPublicKey', { configurable: false, writable: false, value: () => {
            return utils.stringToBase64(publicKey);
        }});
        Object.defineProperty(this, 'encryptObjectToJSON', { configurable: false, writable: false, value: ({ object }) => {
            const remoteBase64RSAPublicKey = userIdentity.getRemoteBase64RSAPublicKey();
            const jsonStr = utils.getJSONString(object) || '{}';
            return utils.encryptToBase64Str(jsonStr, utils.base64ToString(remoteBase64RSAPublicKey));
        }});
        Object.defineProperty(this, 'decryptJSONToObject', { configurable: false, writable: false, value: ({ encryptedJsonStr }) => {
            const hashedPassphrase = userIdentity.getHashedPassphrase();
            return utils.getJSONObject(utils.decryptFromBase64Str(encryptedJsonStr, privateKey, hashedPassphrase));
        }});
    }
};

Encryption.prototype.getBase64RSAPublicKey = function() {}
Encryption.prototype.encryptObjectToJSON = function({ object }) {}
Encryption.prototype.decryptJSONToObject = function({ encryptedJsonStr }) {}

module.exports = { Encryption };
