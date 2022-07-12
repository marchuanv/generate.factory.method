function HttpMessageHandler({ messageQueue }) {
    Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async ({ requestMessage }) => {
        console.log('HttpMessageHandler: Queueing Request Message And Waiting For An Http Response');
        await messageQueue.enqueueRequestMessage({ requestMessage });
        const { responseMessage } = await messageQueue.dequeueHttpResponseMessage();
        return { responseMessage };
    }});
    Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: async ({ callback }) => {
        console.log('HttpMessageHandler: Waiting For Http Requests...');
        const { requestMessage } = await messageQueue.dequeueHttpRequestMessage();
        console.log('HttpMessageHandler: Received Request Message, Now Delegating');
        await callback({ requestMessage });
    }});
    Object.defineProperty(this, 'respond', { configurable: false, writable: false, value: async ({ responseMessage }) => {
        await messageQueue.enqueueResponseMessage({ responseMessage });
    }});
}
HttpMessageHandler.prototype.send = async function({ requestMessage }) { };
HttpMessageHandler.prototype.receive = function({ callback }) { };
HttpMessageHandler.prototype.respond = function({ requestMessage }) { };
module.exports = { HttpMessageHandler };


