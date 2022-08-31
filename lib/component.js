const utils = require('utils');

function Component({ scopeId, clientMessageBus, serverMessageBus, userSessions, packageJson }) {
    const { createHttpServerMessageBus } = require('./factory/httpservermessagebus.factory.js');
    const { createHttpServerMessageBusManager } = require('./factory/httpservermessagebusmanager.factory.js');
    const { createHttpClientMessageBus } = require('./factory/httpclientmessagebus.factory.js');
    const { createHttpClientMessageBusManager } = require('./factory/httpclientmessagebusmanager.factory.js');
    const { createMessage } = require('./factory/message.factory');
    const { senderHost, senderPort, recipientHost, recipientPort, userId, timeout, isServerComponent } = packageJson;
    Object.defineProperty(this, 'initialise', { configurable: false, writable: false, value: async ({ secret }) => {
        const { userSecurity } = userSessions.ensureSession({ userId });
        userSecurity.register({ secret });
        const { token } = userSecurity.authenticate({ secret });
        if (isServerComponent) {
            createHttpServerMessageBus({ scopeId, timeout, senderHost, senderPort });
            createHttpServerMessageBusManager({ scopeId });
            Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: async ({ callback }) => {
                await serverMessageBus.subscribe({ callback });
            }});
            Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async (data) => {
                await serverMessageBus.publish(createMessage({ 
                    scopeId: utils.generateGUID(),
                    messageStatusCode: 0, Id: null, data,
                    recipientHost, recipientPort, metadata: {}, token, senderHost, senderPort 
                }));
            }});
        } else {
            createHttpClientMessageBus({ scopeId, timeout });
            createHttpClientMessageBusManager({ scopeId });
            Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: async ({ callback }) => {
                await clientMessageBus.subscribe({ callback });
            }});
            Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async (data) => {
                await clientMessageBus.publish(createMessage({ 
                    scopeId: utils.generateGUID(),
                    messageStatusCode: 2, Id: null, data,
                    recipientHost, recipientPort, metadata: {}, token, senderHost, senderPort 
                }));
            }});
        }
    }});
};

Component.prototype.initialise = async function({ secret }) {};
Component.prototype.receive = async function({ callback }) { throw new Error('component was not initialised.'); }
Component.prototype.send = async function({ object }) { throw new Error('component was not initialised.'); }

module.exports = { Component };
