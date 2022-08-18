const sessions = {};
function UserSessions({ scopeId }) {
    const { createUserSecurity } = require('./factory/usersecurity.factory.js');
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
