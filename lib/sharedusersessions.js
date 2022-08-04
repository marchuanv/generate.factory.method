const sessions = {};
function SharedUserSessions() {
    const { createUserSecurity } = require('./factory/usersecurity.factory.js');
    Object.defineProperty(this, 'ensureSession', { configurable: false, writable: false, value: ({ userId }) => {
        if (!sessions[userId]) {
            const { userSecurity } = createUserSecurity({ userId });
            sessions[userId] = userSecurity;
        }
        return { userSecurity: sessions[userId] };
    }});
};
SharedUserSessions.prototype.ensureSession = function({ userId }) {};
module.exports = { SharedUserSessions };
