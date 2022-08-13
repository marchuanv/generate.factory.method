const { createMessage } = require('./factory/message.factory');

function Component({ packageJson }) {
    const { createClientMessageBus } = require('./factory/clientmessagebus.factory');
    const { createServerMessageBus } = require('./factory/servermessagebus.factory');
    const { createSharedUserSessions } = require('./factory/sharedusersessions.factory.js');
    const { createSharedLogger } = require('./factory/sharedlogger.factory.js');
    const { senderAddress, recipientAddress, userId, isServerComponent } = packageJson;
    const { recipientHost, recipientPort } = recipientAddress;
    const { senderHost, senderPort } = senderAddress;
    Object.defineProperty(this, 'initialise', { configurable: false, writable: false, value: async ({ secret }) => {
        const contextId = userId;
        const timeout = 15000;
        const { sharedUserSessions } = createSharedUserSessions({});
        const { userSecurity } = sharedUserSessions.ensureSession({ userId });
        userSecurity.register({ secret });
        const { token } = userSecurity.authenticate({ secret });
        const { clientMessageBus } = createClientMessageBus({ contextId, timeout });
        const { serverMessageBus } = createServerMessageBus({ contextId, senderHost, senderPort, timeout });
        if (isServerComponent) {
            Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: async ({ callback }) => {
                await serverMessageBus.subscribeToMessages({ callback });
            }});
            Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async ({ object }) => {
                await serverMessageBus.publishMessage(createMessage({ 
                    messageStatusCode: 0, Id: null, data: object,
                    recipientHost, recipientPort, metadata: {}, token, senderHost, senderPort 
                }));
            }});
        } else {
            Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: async ({ callback }) => {
                await clientMessageBus.subscribeToMessages({ callback });
            }});
            Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async ({ object }) => {
                await clientMessageBus.publishMessage(createMessage({ 
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
