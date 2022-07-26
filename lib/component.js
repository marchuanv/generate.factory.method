function Component({ packageJson }) {
    const { createMessageBus } = require('./factory/messagebus.factory');
    const { senderAddress, recipientAddress, channel, userId, remoteBase64RSAPublicKey } = packageJson;
    const { recipientHost, recipientPort } = recipientAddress;
    const { senderHost, senderPort } = senderAddress;
    Object.defineProperty(this, 'initialise', { configurable: false, writable: false, value: async ({ secret }) => {
        const { messageBus } = createMessageBus({ 
            remoteBase64RSAPublicKey,
            messageQueueTypeCode: 3,
            senderHost, senderPort,
            recipientHost, recipientPort,
            channel, userId
        });
        await messageBus.start();
        Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: async ({ callback }) => {
            return await messageBus.subscribe({ callback });
        }});
        Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async ({ object }) => {
            return await messageBus.publish({ data: object });
        }});
    }});
};

Component.prototype.initialise = async function({ secret }) {};
Component.prototype.receive = async function({ callback }) {}
Component.prototype.send = async function({ object }) {}

module.exports = { Component };
