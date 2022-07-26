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
    Object.defineProperty(this, 'isRegistered', { configurable: false, writable: false, value: () => {
        return userIdentities[userId] !== undefined;
    }});
    Object.defineProperty(this, 'getRemoteBase64RSAPublicKey', { configurable: false, writable: false, value: () => {
        return remoteBase64RSAPublicKey;
    }});
    Object.defineProperty(this, 'setRemoteBase64RSAPublicKey', { configurable: false, writable: false, value: ({ base64RSAPublicKey }) => {
        remoteBase64RSAPublicKey = base64RSAPublicKey;
    }});
    Object.defineProperty(this, 'authenticate', { configurable: false, writable: false, value: ({ secret }) => {
        if (secret) {
            if (this.isRegistered()) {
                const { hashedPassphrase } = utils.hashPassphrase(secret,  userIdentities[userId].hashedPassphraseSalt);
                if (hashedPassphrase === userIdentities[userId].hashedPassphrase) {
                    token = utils.generateGUID();
                    return true;
                }
                return false;
            } else { //if user does not exist
                throw new Error(`authentication failed, ${userId} user is not registered.`);
            }
        } else {
            throw new Error('no secret provided');
        }
    }});
    Object.defineProperty(this, 'isAuthorised', { configurable: false, writable: false, value: () => {
        return token && utils.isBase64String(token);
    }});
    Object.defineProperty(this, 'register', { configurable: false, writable: false, value: ({ secret }) => {
        if (secret) {
            if (this.isRegistered()) {
                throw new Error(`${userId} user already exist.`);
            } else { //if user does not exist
                const { hashedPassphrase, hashedPassphraseSalt } = utils.hashPassphrase(secret);
                userIdentities[userId] = {
                    hashedPassphrase,
                    hashedPassphraseSalt
                };
                fs.writeFileSync(userIdentitiesStorePath, JSON.stringify(userIdentities), 'utf8');
            }
        } else {
            throw new Error('no secret provided');
        }
    }});
    Object.defineProperty(this, 'unregister', { configurable: false, writable: false, value: () => {
        delete userIdentities[userId];
        fs.writeFileSync(userIdentitiesStorePath, JSON.stringify(userIdentities), 'utf8');
    }});
    Object.defineProperty(this, 'getHashedPassphrase', { configurable: false, writable: false, value: () => {
        if (this.isRegistered()) {
            return userIdentities[userId].hashedPassphrase;
        } else {
            throw new Error(`${userId} is not registered.`);
        }
    }});
    Object.defineProperty(this, 'getHashedPassphraseSalt', { configurable: false, writable: false, value: () => {
        if (this.isRegistered()) {
            return userIdentities[userId].hashedPassphraseSalt;
        } else {
            throw new Error(`${userId} is not registered.`);
        }
    }});
    Object.defineProperty(this, 'getUserId', { configurable: false, writable: false, value: () => {
        return userId;
    }});
    Object.defineProperty(this, 'getUserToken', { configurable: false, writable: false, value: () => {
        return token;
    }});
    Object.defineProperty(this, 'setUserToken', { configurable: false, writable: false, value: ({ remoteToken }) => {
        token = remoteToken;
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
UserIdentity.prototype.getHashedPassphraseSalt = function() { };
UserIdentity.prototype.getUserId = function() { };
UserIdentity.prototype.getUserToken = function() { };
UserIdentity.prototype.setUserToken = function({ remoteToken }) { };

module.exports = { UserIdentity };
