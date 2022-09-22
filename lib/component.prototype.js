function Component({ factoryContainerBindingName, clientMessageBus, serverMessageBus, userSessions, packageJson }) {
    this.constructor({ factoryContainerBindingName, clientMessageBus, serverMessageBus, userSessions, packageJson });
};
Component.prototype.initialise = async function({ secret }) {};
Component.prototype.receive = async function({ callback }) { throw new Error('component was not initialised.'); }
Component.prototype.send = async function({ object }) { throw new Error('component was not initialised.'); }
module.exports = { Component };
