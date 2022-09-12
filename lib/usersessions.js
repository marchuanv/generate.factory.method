const { createUserSecurity } = require('./factory/usersecurity.factory.js');
const { UserSessions } = require("./usersessions.prototype");
UserSessions.prototype.constructor = function() {
    const sessions = {};
    Object.defineProperty(this, 'ensureSession', { configurable: false, writable: false, value: ({ userId }) => {
        if (!sessions[userId]) {
            const { userSecurity } = createUserSecurity({ scopeId, userId });
            sessions[userId] = userSecurity;
        }
        return { userSecurity: sessions[userId] };
    }});
};
