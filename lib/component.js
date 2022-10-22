const { createHttpServerMessageBus } = require('./factory/generated/httpservermessagebus/httpservermessagebus.factory.js');
const { createHttpServerMessageBusManager } = require('./factory/generated/httpservermessagebusmanager/httpservermessagebusmanager.factory.js');
const { createHttpClientMessageBus } = require('./factory/generated/httpclientmessagebus/httpclientmessagebus.factory.js');
const { createHttpClientMessageBusManager } = require('./factory/generated/httpclientmessagebusmanager/httpclientmessagebusmanager.factory.js');
const { createMessage } = require('./factory/generated/message/message.factory');
const { Component } = require("./component.prototype");

Component.prototype.constructor = function({ contextName, clientMessageBus, serverMessageBus, userSessions, packageJson }) {
    const { senderHost, senderPort, recipientHost, recipientPort, userId, timeout, isServerComponent } = packageJson;
    Object.defineProperty(this, 'initialise', { configurable: false, writable: false, value: async ({ secret }) => {
        const { userSecurity } = userSessions.ensureSession({ userId });
        userSecurity.register({ secret });
        const { token } = userSecurity.authenticate({ secret });
        if (isServerComponent) {
            createHttpServerMessageBus({ contextName, timeout, senderHost, senderPort });
            createHttpServerMessageBusManager({ contextName });
            Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: ({ callback }) => {
                serverMessageBus.subscribe({ callback });
            }});
            Object.defineProperty(this, 'send', { configurable: false, writable: false, value: (data) => {
                serverMessageBus.publish(createMessage({ 
                    contextName,
                    messageStatusCode: 0, data,
                    recipientHost, recipientPort, metadata: {}, token, senderHost, senderPort 
                }));
            }});
        } else {
            createHttpClientMessageBus({ contextName, timeout });
            createHttpClientMessageBusManager({ contextName });
            Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: ({ callback }) => {
                clientMessageBus.subscribe({ callback });
            }});
            Object.defineProperty(this, 'send', { configurable: false, writable: false, value: (data) => {
                clientMessageBus.publish(createMessage({ 
                    contextName,
                    messageStatusCode: 2, data,
                    recipientHost, recipientPort, metadata: {}, token, senderHost, senderPort 
                }));
            }});
        }
    }});
};
module.exports = { Component };
