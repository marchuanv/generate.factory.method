const utils = require('utils');
const { createMessage } = require('./factory/message.factory');

function dequeue({ name, queue }) {
    return new Promise((resolve) => {
        const id = setInterval( async () => {
            const object = (queue.shift() || { });
            if (!utils.isEmptyObject(object) && object[name]) {
                clearInterval(id);
                resolve(object);                  
            }
        },1000);
    });
}

function MessageQueue({ userId }) {
    
    const requestMessages = [];
    const responseMessages = [];

    Object.defineProperty(this, 'enqueueRequestMessage', { configurable: false, writable: false, value: ({  httpRequestMessage, message }) => {
        const requestMsg = message || httpRequestMessage;
        const { senderHost, senderPort } = requestMsg.getSenderAddress();
        const data = requestMsg.getContent();
        const token = requestMsg.getToken();
        const metadata = requestMsg.getContentMetadata();
        const { code } = requestMsg.getMessageStatus();
        const messageStatusCode = code;
        {
            const { message } = createMessage({ senderHost, senderPort, userId, data, token, metadata, messageStatusCode });
            requestMessages.push({ requestMessage: message });
        }
    }});
    Object.defineProperty(this, 'enqueueResponseMessage', { configurable: false, writable: false, value: ({ httpResponseMessage, message }) => {
        const responseMsg = message || httpResponseMessage;
        const { senderHost, senderPort } = responseMsg.getSenderAddress();
        const token = responseMsg.getToken();
        const { code } = responseMsg.getMessageStatus();
        const messageStatusCode = code;
        const data = responseMsg.getContent();
        const metadata = responseMsg.getContentMetadata();
        {
            const { message } = createMessage({ senderHost, senderPort, userId, data, token, metadata, messageStatusCode });
            responseMessages.push({ responseMessage: message });
        }
    }});
    Object.defineProperty(this, 'dequeueRequestMessage', { configurable: false, writable: false, value: async () => {
        return await dequeue({ name: 'requestMessage', queue: requestMessages });
    }});
    Object.defineProperty(this, 'dequeueResponseMessage', { configurable: false, writable: false, value: async () => {
        return await dequeue({ name: 'responseMessage', queue: responseMessages });
    }});
};

MessageQueue.prototype.enqueueRequestMessage = function({ httpRequestMessage }) { };
MessageQueue.prototype.enqueueResponseMessage = function({ httpResponseMessage }) { };
MessageQueue.prototype.dequeueRequestMessage = function () { };
MessageQueue.prototype.dequeueResponseMessage = function () { };

module.exports = { MessageQueue };