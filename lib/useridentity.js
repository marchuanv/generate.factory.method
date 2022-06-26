const fs = require('fs');
const utils = require('utils');
const path = require('path');
const userIdentitiesStorePath = path.join(__dirname, '../useridentities.json');
let userIdentities = {};
if (fs.existsSync(userIdentitiesStorePath)) {
    userIdentities = require(userIdentitiesStorePath);
} else {
    fs.writeFileSync(userIdentitiesStorePath, JSON.stringify(userIdentities), 'utf8');
}
function UserIdentity ({ userId }) {
    if (userId) {
        this.userId = userId;
    } else {
        throw new Error('no userid provided');
    }
};
UserIdentity.prototype.authenticate = async function({ secret }) {
    if (secret) {
        if (await this.isRegistered()) {
            const { hashedPassphrase } = utils.hashPassphrase(secret,  userIdentities[this.userId].hashedPassphraseSalt);
            if (hashedPassphrase === userIdentities[this.userId].hashedPassphrase) {
                return true;
            }
        } else { //if user does not exist
            throw new Error(`authentication failed, ${this.userId} user is not registered.`);
        }
    } else {
        throw new Error('no secret provided');
    }
},
UserIdentity.prototype.register = function({ secret }) {
    if (secret) {
        if (this.isRegistered()) {
            throw new Error(`${this.userId} user already exist.`);
        } else { //if user does not exist
            const { hashedPassphrase, hashedPassphraseSalt } = utils.hashPassphrase(secret);
            userIdentities[this.userId] = {
                hashedPassphrase,
                hashedPassphraseSalt
            };
            fs.writeFileSync(userIdentitiesStorePath, JSON.stringify(userIdentities), 'utf8');
        }
    } else {
        throw new Error('no secret provided');
    }
},
UserIdentity.prototype.unregister = function() {
    delete userIdentities[this.userId];
    fs.writeFileSync(userIdentitiesStorePath, JSON.stringify(userIdentities), 'utf8');
},
UserIdentity.prototype.getHashedPassphrase = function() {
    if (this.isRegistered()) {
        return userIdentities[this.userId].hashedPassphrase;
    } else {
        throw new Error(`${this.userId} is not registered.`);
    }
};
UserIdentity.prototype.getHashedPassphraseSalt = function() {
    if (this.isRegistered()) {
        return userIdentities[this.userId].hashedPassphraseSalt;
    } else {
        throw new Error(`${this.userId} is not registered.`);
    }
}
UserIdentity.prototype.getUserId = function() {
    return this.userId;
}
UserIdentity.prototype.isRegistered = function() {
    const userId = this.getUserId();
    return userIdentities[userId] !== undefined;
}
module.exports = { UserIdentity };
