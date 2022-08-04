const sessions = {};
function UserSession({ userId }) {
    let loadedUserIdentity = sessions[userId];
    if (loadedUserIdentity) {
        Object.defineProperty(this, 'getUserIdentity', { configurable: false, writable: false, value: () => {
            return { userIdentity: loadedUserIdentity };
        }});
    } else {
        const { createUserSecurity } = require("./factory/usersecurity.factory");
        const { userSecurity } = createUserSecurity({ userId });
        sessions[userId] = userSecurity;
        Object.defineProperty(this, 'getUserIdentity', { configurable: false, writable: false, value: () => {
            return { userIdentity: sessions[userId] };
        }});
    }
};
UserSession.prototype.getUserIdentity = function() {};
module.exports = { UserSession };
