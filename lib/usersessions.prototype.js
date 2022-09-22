function UserSessions({ factoryContainerBindingName }) {
    this.constructor({ factoryContainerBindingName });
};
UserSessions.prototype.ensureSession = function({ userId }) {};
module.exports = { UserSessions };
