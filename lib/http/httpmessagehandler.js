function HttpMessageHandler({ messageQueue }) {
    Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async ({ path, headers, method, data }) => {
        console.log('HttpMessageHandler: Sending Http Request And Waiting For Http Response');
        await messageQueue.enqueueRawHttpRequest({ path, headers, method, data });
        return await messageQueue.dequeueHttpResponseMessage();
    }});
    Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: async ({ callback }) => {
        console.log('HttpMessageHandler: Receiving Http Response And Waiting For Http Response');
        const { httpRequestMessage } = await messageQueue.dequeueHttpRequestMessage();
        const { httpResponseMessage } = await callback({ httpRequestMessage });
        await messageQueue.enqueueHttpResponseMessage({ httpResponseMessage });
    }});
}
HttpMessageHandler.prototype.send = async function({ path, headers, method, data }) { };
HttpMessageHandler.prototype.receive = function({ callback }) { };
module.exports = { HttpMessageHandler };


