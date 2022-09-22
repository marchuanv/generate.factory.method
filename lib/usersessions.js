const { createUserSecurity } = require('./factory/generated/usersecurity/usersecurity.factory.js');
const { UserSessions } = require("./usersessions.prototype");
UserSessions.prototype.constructor = function({ factoryContainerBindingName }) {
    const sessions = {};
    Object.defineProperty(this, 'ensureSession', { configurable: false, writable: false, value: ({ userId }) => {
        if (!sessions[userId]) {
            const { userSecurity } = createUserSecurity({ factoryContainerBindingName, userId });
            sessions[userId] = userSecurity;
        }
        return { userSecurity: sessions[userId] };
    }});
};
module.exports = { UserSessions };
