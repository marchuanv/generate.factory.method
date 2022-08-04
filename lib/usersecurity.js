const fs = require('fs');
const utils = require('utils');
const path = require('path');
const userIdentitiesStorePath = path.join(__dirname, '../useridentities.json');
let userIdentities = {};
if (fs.existsSync(userIdentitiesStorePath)) {
    userIdentities = require(userIdentitiesStorePath);
} else {
    fs.writeFileSync(userIdentitiesStorePath, JSON.stringify(userIdentities, null, 4), 'utf8');
}
function UserSecurity({ userId }) {
    let remoteBase64RSAPublicKey = null;
    let token = null;
    let base64RSAPrivateKey;
    let base64RSAPublicKey;
    let user = userIdentities[userId];
  
    Object.defineProperty(this, 'isRegistered', { configurable: false, writable: false, value: () => {
        return user !== undefined;
    }});
    Object.defineProperty(this, 'getRemoteBase64RSAPublicKey', { configurable: false, writable: false, value: () => {
        return remoteBase64RSAPublicKey;
    }});
    Object.defineProperty(this, 'setRemoteBase64RSAPublicKey', { configurable: false, writable: false, value: ({ base64RSAPublicKey }) => {
        remoteBase64RSAPublicKey = base64RSAPublicKey;
    }});
    Object.defineProperty(this, 'authenticate', { configurable: false, writable: false, value: ({ secret }) => {
        if (secret) {
            const { hashedPassphrase } = utils.hashPassphrase(secret,  user.hashedPassphraseSalt);
            if (hashedPassphrase === user.hashedPassphrase) {
                token = utils.stringToBase64(utils.getJSONString({ userId }));
                const { privateKey, publicKey } = utils.generatePublicPrivateKeys(hashedPassphrase);
                base64RSAPrivateKey = utils.stringToBase64(privateKey);
                base64RSAPublicKey = utils.stringToBase64(publicKey);
                return true;
            }
            return false;
        } else {
            throw new Error('no secret provided');
        }
    }});
    Object.defineProperty(this, 'isAuthorised', { configurable: false, writable: false, value: () => {
        return token && utils.isBase64String(token);
    }});
    Object.defineProperty(this, 'register', { configurable: false, writable: false, value: ({ secret }) => {
        if (secret) {
            const { hashedPassphrase, hashedPassphraseSalt } = utils.hashPassphrase(secret);
            user = { hashedPassphrase, hashedPassphraseSalt };
            userIdentities[userId] = user;
            fs.writeFileSync(userIdentitiesStorePath, JSON.stringify(userIdentities), 'utf8');
        } else {
            throw new Error('no secret provided');
        }
    }});
    Object.defineProperty(this, 'unregister', { configurable: false, writable: false, value: () => {
        delete userIdentities[userId];
        fs.writeFileSync(userIdentitiesStorePath, JSON.stringify(userIdentities), 'utf8');
    }});
    Object.defineProperty(this, 'getHashedPassphrase', { configurable: false, writable: false, value: () => {
        return user.hashedPassphrase;
    }});
    Object.defineProperty(this, 'getUserId', { configurable: false, writable: false, value: () => {
        return userId;
    }});
    Object.defineProperty(this, 'getBase64KeyPair', { configurable: false, writable: false, value: () => {
        return { base64RSAPrivateKey, base64RSAPublicKey };
    }});
    Object.defineProperty(this, 'getKeyPair', { configurable: false, writable: false, value: () => {
        return { privateKey: utils.base64ToString(base64RSAPrivateKey), publicKey: utils.base64ToString(base64RSAPublicKey) };
    }});
    Object.defineProperty(this, 'encryptObjectToJSON', { configurable: false, writable: false, value: ({ object }) => {
        const remoteBase64RSAPublicKey = this.getRemoteBase64RSAPublicKey();
        const jsonStr = utils.getJSONString(object) || '{}';
        return utils.encryptToBase64Str(jsonStr, utils.base64ToString(remoteBase64RSAPublicKey));
    }});
    Object.defineProperty(this, 'decryptJSONToObject', { configurable: false, writable: false, value: ({ encryptedJsonStr }) => {
        const hashedPassphrase = this.getHashedPassphrase();
        const { privateKey } = this.getKeyPair();
        return utils.getJSONObject(utils.decryptFromBase64Str(encryptedJsonStr, privateKey, hashedPassphrase));
    }});
};

UserSecurity.prototype.isRegistered = function() {};
UserSecurity.prototype.getRemoteBase64RSAPublicKey = function() {};
UserSecurity.prototype.setRemoteBase64RSAPublicKey = function({ base64RSAPublicKey }) {};
UserSecurity.prototype.authenticate = function({ secret }) { };
UserSecurity.prototype.isAuthorised = function() { };
UserSecurity.prototype.register = function({ secret }) { };
UserSecurity.prototype.unregister = function() { };
UserSecurity.prototype.getHashedPassphrase = function() { };
UserSecurity.prototype.getUserId = function() { };
UserSecurity.prototype.getBase64KeyPair = function() {};
UserSecurity.prototype.getKeyPair = function() {};
UserSecurity.prototype.encryptObjectToJSON = function({ object }) {};
UserSecurity.prototype.decryptJSONToObject = function({ encryptedJsonStr }) {};

module.exports = { UserSecurity };
