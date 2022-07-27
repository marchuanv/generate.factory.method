const { createMessage } = require("./factory/message.factory");

function MessageBus({ messageHandlerQueue, senderAddress, recipientAddress, channel, userId, remoteBase64RSAPublicKey }) {
    const callbacks = [];
    const { recipientHost, recipientPort } = recipientAddress;
    const { senderHost, senderPort } = senderAddress;
    let loopId = null;
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ data }) => {
        const { message } = createMessage({ recipientHost, recipientPort, Id: null, userId, remoteBase64RSAPublicKey,
            data, senderHost, senderPort, token: null,
            metadata: { channel }, messageStatusCode: 2
        });
        await messageHandlerQueue.enqueueRequestMessage({ requestMessage: message });
    }});
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
        callbacks.push(callback);
    }});
    Object.defineProperty(this, 'start', { configurable: false, writable: false, value: async () => {
        await messageHandlerQueue.open();
        loopId = setInterval(async () => {
            const { requestMessage } = await messageHandlerQueue.dequeueRequestMessage();
            for(const callback of callbacks) {
                await callback({ requestMessage });
            };
            const { message } = createMessage({ 
                recipientHost, recipientPort, 
                Id: null, data:"subscribers notified",
                metadata: {
                    userId: "joe",
                    secret: "secret1234",
                    remotebase64rsapublickey: "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0NCk1JR2VNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0R01BRENCaUFLQmdHTldFenp0b3JYcmJoSmxEdTBQaFlvUGxHZXN5bXowR0Z6czFvSEVUQ1lwWnY1TkxEaVpiNzFtNlpKY2RhSlZmSHJ2dTVxNDN6SGdObU84K0lMeE9tdFVLZnJBOHR1azcwSFl0QllCU05tZGVCZGRHSnZQYjVndFRiMksxUCtNY3VuUzVUbmw2U2RBZDFkVUdva1BGeEFwS3JGbkFPaHpWd0dEbUMvZE50QkhBZ01CQUFFPQ0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t"
                },
                senderHost, senderPort, token: null,
                 messageStatusCode: 0
            });
            await messageHandlerQueue.enqueueResponseMessage({ responseMessage: message });
        },100);
    }});
    Object.defineProperty(this, 'stop', { configurable: false, writable: false, value: async () => {
        await messageHandlerQueue.close();
        clearInterval(loopId);
    }});
};
MessageBus.prototype.publish = function({ data }) { };
MessageBus.prototype.subscribe = async function({ callback }) { };
MessageBus.prototype.start = async function({ userId, secret }) { };
MessageBus.prototype.stop = async function() { };
module.exports = { MessageBus };
