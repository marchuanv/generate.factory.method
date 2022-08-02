const utils = require('utils');

function Encryption({ userIdentity }) {
    if (userIdentity.isRegistered()) {
        Object.defineProperty(this, 'encryptObjectToJSON', { configurable: false, writable: false, value: ({ object }) => {
            const remoteBase64RSAPublicKey = userIdentity.getRemoteBase64RSAPublicKey();
            const jsonStr = utils.getJSONString(object) || '{}';
            return utils.encryptToBase64Str(jsonStr, utils.base64ToString(remoteBase64RSAPublicKey));
        }});
        Object.defineProperty(this, 'decryptJSONToObject', { configurable: false, writable: false, value: ({ encryptedJsonStr }) => {
            const hashedPassphrase = userIdentity.getHashedPassphrase();
            const { privateKey } = userIdentity.getKeyPair();
            return utils.getJSONObject(utils.decryptFromBase64Str(encryptedJsonStr, privateKey, hashedPassphrase));
        }});
    }
};

Encryption.prototype.getBase64RSAPublicKey = function() {}
Encryption.prototype.encryptObjectToJSON = function({ object }) {}
Encryption.prototype.decryptJSONToObject = function({ encryptedJsonStr }) {}

module.exports = { Encryption };
