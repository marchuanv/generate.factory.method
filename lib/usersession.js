const sessions = {};
function UserSession({ userId }) {
    let loadedUserSecurity = sessions[userId];
    if (loadedUserSecurity) {
        Object.defineProperty(this, 'getUserSecurity', { configurable: false, writable: false, value: () => {
            return { userSecurity: loadedUserSecurity };
        }});
    } else {
        const { createUserSecurity } = require("./factory/usersecurity.factory");
        const { userSecurity } = createUserSecurity({ userId });
        sessions[userId] = userSecurity;
        Object.defineProperty(this, 'getUserSecurity', { configurable: false, writable: false, value: () => {
            return { userSecurity: sessions[userId] };
        }});
    }
};
UserSession.prototype.getUserSecurity = function() {};
module.exports = { UserSession };
