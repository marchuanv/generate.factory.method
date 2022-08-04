function SharedUserSessions() {
    const sessions = {};
    const { createUserSecurity } = require('./factory/usersecurity.factory.js');
    Object.defineProperty(this, 'getUserSecurity', { configurable: false, writable: false, value: ({ userId }) => {
        if (!sessions[userId]) {
            const { userSecurity } = createUserSecurity({ userId });
            sessions[userId] = userSecurity;
        }
        return { userSecurity: sessions[userId] };
    }});
};
SharedUserSessions.prototype.getUserSecurity = function({ userId }) {};
module.exports = { SharedUserSessions };
