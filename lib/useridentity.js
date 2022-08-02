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
function UserIdentity({ userId }) {
    let remoteBase64RSAPublicKey = null;
    let token = null;
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
            const { privateKey, publicKey } = utils.generatePublicPrivateKeys(hashedPassphrase);
            const privateKeyBase64 = utils.stringToBase64(privateKey);
            const publicKeyBase64 = utils.stringToBase64(publicKey);
            user = { hashedPassphrase, hashedPassphraseSalt, privateKeyBase64, publicKeyBase64 };
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
    Object.defineProperty(this, 'getUserToken', { configurable: false, writable: false, value: () => {
        return token;
    }});
    Object.defineProperty(this, 'getBase64KeyPair', { configurable: false, writable: false, value: () => {
        const { privateKeyBase64, publicKeyBase64 } = user;
        return { privateKeyBase64, publicKeyBase64 };
    }});
    Object.defineProperty(this, 'getKeyPair', { configurable: false, writable: false, value: () => {
        const { privateKeyBase64, publicKeyBase64 } = user;
        return { privateKey: utils.base64ToString(privateKeyBase64), publicKey: utils.base64ToString(publicKeyBase64) };
    }});
};

UserIdentity.prototype.isRegistered = function() {};
UserIdentity.prototype.getRemoteBase64RSAPublicKey = function() {};
UserIdentity.prototype.setRemoteBase64RSAPublicKey = function({ base64RSAPublicKey }) {};
UserIdentity.prototype.authenticate = function({ secret }) { };
UserIdentity.prototype.isAuthorised = function() { };
UserIdentity.prototype.register = function({ secret }) { };
UserIdentity.prototype.unregister = function() { };
UserIdentity.prototype.getHashedPassphrase = function() { };
UserIdentity.prototype.getUserId = function() { };
UserIdentity.prototype.getUserToken = function() { };
UserIdentity.prototype.getBase64KeyPair = function() {};
UserIdentity.prototype.getKeyPair = function() {};

module.exports = { UserIdentity };
