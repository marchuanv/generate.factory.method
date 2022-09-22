const { UserSecurity } = require("./usersecurity.prototype");
const { writeFileSync, readFileSync, existsSync } = require('fs');
const path = require("path");
UserSecurity.prototype.constructor = function({ userId }) {

    const userIdentitiesStorePath = path.join(__dirname,'../', 'useridentities.json');
    let _remoteBase64RSAPublicKey = null;
    let base64RSAPrivateKey;
    let base64RSAPublicKey;
    let user = null;
    if (existsSync(userIdentitiesStorePath)) {
        const userIdentities = require(userIdentitiesStorePath)
        user = userIdentities[userId];
    }
    let authToken = null;
  
    Object.defineProperty(this, 'isRegistered', { configurable: false, writable: false, value: () => {
        return user !== undefined;
    }});

    Object.defineProperty(this, 'authenticate', { configurable: false, writable: false, value: ({ secret, remoteBase64RSAPublickey }) => {
        authToken = null;
        const { hashedPassphrase } = utils.hashPassphrase(secret,  user.hashedPassphraseSalt);
        if (hashedPassphrase === user.hashedPassphrase) {
            const { privateKey, publicKey } = utils.generatePublicPrivateKeys(hashedPassphrase);
            base64RSAPrivateKey = utils.stringToBase64(privateKey);
            base64RSAPublicKey = utils.stringToBase64(publicKey);
            if (remoteBase64RSAPublickey) {
                _remoteBase64RSAPublicKey = remoteBase64RSAPublickey
            } else {
                _remoteBase64RSAPublicKey = base64RSAPublicKey;
            }
            authToken = utils.stringToBase64(utils.getJSONString({ userId, base64RSAPublicKey }));
            return { token: authToken };
        }
        return false;
    }});
    Object.defineProperty(this, 'isAuthorised', { configurable: false, writable: false, value: ({ token }) => {
        return utils.isBase64String(base64RSAPrivateKey) && utils.isBase64String(base64RSAPublicKey) && authToken === token;
    }});
    Object.defineProperty(this, 'register', { configurable: false, writable: false, value: ({ secret }) => {
        const { hashedPassphrase, hashedPassphraseSalt } = utils.hashPassphrase(secret);
        user = { hashedPassphrase, hashedPassphraseSalt };
        userIdentities[userId] = user;
        fs.writeFileSync(userIdentitiesStorePath, JSON.stringify(userIdentities), 'utf8');
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
    Object.defineProperty(this, 'getBase64PublicKey', { configurable: false, writable: false, value: () => {
        return { base64RSAPublicKey };
    }});
    Object.defineProperty(this, 'getPublicKey', { configurable: false, writable: false, value: () => {
        return { publicKey: utils.base64ToString(base64RSAPublicKey) };
    }});
    Object.defineProperty(this, 'getToken', { configurable: false, writable: false, value: () => {
        return { token: authToken };
    }});
    Object.defineProperty(this, 'encryptObjectToJSON', { configurable: false, writable: false, value: ({ object }) => {
        const jsonStr = utils.getJSONString(object) || '{}';
        return utils.encryptToBase64Str(jsonStr, utils.base64ToString(_remoteBase64RSAPublicKey));
    }});
    Object.defineProperty(this, 'decryptJSONToObject', { configurable: false, writable: false, value: ({ encryptedJsonStr }) => {
        const hashedPassphrase = this.getHashedPassphrase();
        const privateKey = utils.base64ToString(base64RSAPrivateKey);
        return utils.getJSONObject(utils.decryptFromBase64Str(encryptedJsonStr, privateKey, hashedPassphrase));
    }});
};
module.exports = { UserSecurity };
