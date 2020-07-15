const { MessageBus } = require('./messagebus');
const { UserIdentity } = require('./useridentity');
const { MessageBusFactory } = require('./messagebusfactory');
const { MessageHandler } = require('./messagehandler');
const { HttpMessageHandler } = require('./http/httpmessagehandler');
const { HttpMessageFactory } = require('./http/httpmessagefactory');
const { ErrorMessages } = require('./errormessages');
const { Encryption } = require('./encryption');
const utils = require('utils');
function Component(packageJson) {
    let messageBus;
    const { host, port, name } = packageJson;
    const channelName = name;
    const id = `${name}_${utils.generateGUID()}`;
    const errorMessages = new ErrorMessages();
    const messageBusFactory = new MessageBusFactory({ host, port, errorMessages });
    Object.defineProperty(this, 'initialise', { writable: false, value: async ({ userid, secret }) => {
        messageBus = messageBusFactory.createsecure({ userid, secret });
    }});
    Object.defineProperty(this, 'receive', { writable: false, value: async ({ callback }) => {
        return await messageBus.subscribe({ channelName, callback });
    }});
    Object.defineProperty(this, 'send', { writable: false, value: async ({ object }) => {
        return await messageBus.publish({ channelName, data: object });
    }});
    Object.defineProperty(this, 'getId', { writable: false, value: () => {
        return id;
    }});
};
Component.prototype.initialise = async function({ userid, secret }) {};
Component.prototype.receive = async function({ callback }) {}
Component.prototype.send = async function({ object }) {}
Component.prototype.getId = function() {}
module.exports = { Component };
