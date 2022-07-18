function HttpMessageHandler({ messageQueue }) {
    Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async ({ requestMessage }) => {
        console.log('HttpMessageHandler: Queueing Request Message And Waiting For An Http Response');
        await messageQueue.enqueueHttpRequestMessage({ requestMessage });
        const { httpResponseMessage } = await messageQueue.dequeueHttpResponseMessage();
        await messageQueue.enqueueResponseMessageConvert({ httpResponseMessage });
        return await messageQueue.dequeueResponseMessage();
    }});
    Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: async ({ callback }) => {
        console.log('HttpMessageHandler: Waiting For Http Requests...');
        const { httpRequestMessage } = await messageQueue.dequeueHttpRequestMessage();
        await messageQueue.enqueueRequestMessageConvert({ httpRequestMessage });
        const { requestMessage } = await messageQueue.dequeueRequestMessage();
        console.log('HttpMessageHandler: Received Http Request Message, Now Delegating');
        await callback({ requestMessage });
    }});
    Object.defineProperty(this, 'respond', { configurable: false, writable: false, value: async ({ responseMessage }) => {
        await messageQueue.enqueueHttpResponseMessage({ responseMessage });
    }});
}
HttpMessageHandler.prototype.send = async function({ requestMessage }) { };
HttpMessageHandler.prototype.receive = function({ callback }) { };
HttpMessageHandler.prototype.respond = function({ requestMessage }) { };
module.exports = { HttpMessageHandler };


