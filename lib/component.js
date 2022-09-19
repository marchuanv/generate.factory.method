const utils = require('utils');
const { createHttpServerMessageBus } = require('./factory/httpservermessagebus.factory.js');
const { createHttpServerMessageBusManager } = require('./factory/httpservermessagebusmanager.factory.js');
const { createHttpClientMessageBus } = require('./factory/httpclientmessagebus.factory.js');
const { createHttpClientMessageBusManager } = require('./factory/httpclientmessagebusmanager.factory.js');
const { createMessage } = require('./factory/message.factory');
const { Component } = require("./component.prototype");

Component.prototype.constructor = function() {
    const { senderHost, senderPort, recipientHost, recipientPort, userId, timeout, isServerComponent } = packageJson;
    Object.defineProperty(this, 'initialise', { configurable: false, writable: false, value: async ({ secret }) => {
        const { userSecurity } = userSessions.ensureSession({ userId });
        userSecurity.register({ secret });
        const { token } = userSecurity.authenticate({ secret });
        if (isServerComponent) {
            createHttpServerMessageBus({ factoryContainerBindingName, timeout, senderHost, senderPort });
            createHttpServerMessageBusManager({ factoryContainerBindingName });
            Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: async ({ callback }) => {
                await serverMessageBus.subscribe({ callback });
            }});
            Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async (data) => {
                await serverMessageBus.publish(createMessage({ 
                    factoryContainerBindingName: utils.generateGUID(),
                    messageStatusCode: 0, Id: null, data,
                    recipientHost, recipientPort, metadata: {}, token, senderHost, senderPort 
                }));
            }});
        } else {
            createHttpClientMessageBus({ factoryContainerBindingName, timeout });
            createHttpClientMessageBusManager({ factoryContainerBindingName });
            Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: async ({ callback }) => {
                await clientMessageBus.subscribe({ callback });
            }});
            Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async (data) => {
                await clientMessageBus.publish(createMessage({ 
                    factoryContainerBindingName: utils.generateGUID(),
                    messageStatusCode: 2, Id: null, data,
                    recipientHost, recipientPort, metadata: {}, token, senderHost, senderPort 
                }));
            }});
        }
    }});
};
module.exports = { Component };
