const utils = require('utils');

function Component({ scopeId, packageJson }) {
    const { createClientMessageBus } = require('./factory/clientmessagebus.factory');
    const { createServerMessageBus } = require('./factory/servermessagebus.factory');
    const { createUserSessions } = require('./factory/usersessions.factory.js');
    const { createMessage } = require('./factory/message.factory');
    const { senderHost, senderPort, recipientHost, recipientPort, userId, timeout, isServerComponent } = packageJson;
    Object.defineProperty(this, 'initialise', { configurable: false, writable: false, value: async ({ secret }) => {
        const { userSessions } = createUserSessions({ scopeId });
        const { userSecurity } = userSessions.ensureSession({ userId });
        userSecurity.register({ secret });
        const { token } = userSecurity.authenticate({ secret });
        if (isServerComponent) {
            const { serverMessageBus } = createServerMessageBus({ scopeId, senderHost, senderPort, timeout });
            Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: async ({ callback }) => {
                await serverMessageBus.subscribeToMessages({ callback });
            }});
            Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async ({ object }) => {
                await serverMessageBus.publishMessage(createMessage({ 
                    scopeId: utils.generateGUID(),
                    messageStatusCode: 0, Id: null, data: object,
                    recipientHost, recipientPort, metadata: {}, token, senderHost, senderPort 
                }));
            }});
        } else {
            const { clientMessageBus } = createClientMessageBus({ scopeId, timeout });
            Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: async ({ callback }) => {
                await clientMessageBus.subscribe({ callback });
            }});
            Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async ({ object }) => {
                await clientMessageBus.publishMessage(createMessage({ 
                    scopeId: utils.generateGUID(),
                    messageStatusCode: 2, Id: null, data: object,
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
