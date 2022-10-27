function UserSessions({ contextName }) {
    this.constructor({ contextName });
};
UserSessions.prototype.ensureSession = function({ userId }) {};
module.exports = { UserSessions };
