const utils = require('utils');
const { createMessageBus } = require('./factory/messagebus.factory');
function Component(packageJson) {
    
    const { host, port, name } = packageJson;
    const channelName = name;
    const id = `${name}_${utils.generateGUID()}`;
    
    Object.defineProperty(this, 'initialise', { configurable: false, writable: false, value: async ({ userid, secret }) => {
        let messageBus = createMessageBus({  });

        messageBus = messageBusFactory.createsecure({ userid, secret });
    }});
    Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: async ({ callback }) => {
        return await messageBus.subscribe({ channelName, callback });
    }});
    Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async ({ object }) => {
        return await messageBus.publish({ channelName, data: object });
    }});
    Object.defineProperty(this, 'getId', { configurable: false, writable: false, value: () => {
        return id;
    }});
};
Component.prototype.initialise = async function({ userid, secret }) {};
Component.prototype.receive = async function({ callback }) {}
Component.prototype.send = async function({ object }) {}
Component.prototype.getId = function() {}
module.exports = { Component };
