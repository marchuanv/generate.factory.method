const sessions = {};
function UserSession({ userId }) {
    const { createUserIdentity } = require("./factory/useridentity.factory");
    let loadedUserIdentity = sessions[userId];
    if (existingSession) {
        Object.defineProperty(this, 'getUserIdentity', { configurable: false, writable: false, value: () => {
           return loadedUserIdentity;
        }});
    } else {
        const { userIdentity } = createUserIdentity({ userId });
        sessions[userId] = userIdentity;
        Object.defineProperty(this, 'getUserIdentity', { configurable: false, writable: false, value: () => {
            return sessions[userId];
        }});
    }
    
};
UserSession.prototype.getUserIdentity = function() {};
module.exports = { UserSession };
