const { createUserSecurity } = require('./factory/usersecurity.factory.js');
function UserSessions({ scopeId }) {
    const sessions = {};
    Object.defineProperty(this, 'ensureSession', { configurable: false, writable: false, value: ({ userId }) => {
        if (!sessions[userId]) {
            const { userSecurity } = createUserSecurity({ scopeId, userId });
            sessions[userId] = userSecurity;
        }
        return { userSecurity: sessions[userId] };
    }});
};
UserSessions.prototype.ensureSession = function({ userId }) {};
module.exports = { UserSessions };
