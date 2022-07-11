function HttpMessageHandler({ httpConnection, messageQueue }) {
    Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async ({ path, headers, method, data }) => {
        await messageQueue.enqueueRawHttpRequest({ path, headers, method, data });
        return await messageQueue.dequeueHttpResponseMessage();
    }});
    Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: async ({ callback }) => {
        await httpConnection.open();
        const { httpRequestMessage } = await messageQueue.dequeueHttpRequestMessage();
        const { httpResponseMessage } = await callback({ httpRequestMessage });
        await httpConnection.close();
        await messageQueue.enqueueHttpResponseMessage({ httpResponseMessage });
    }});
}
HttpMessageHandler.prototype.send = async function({ path, headers, method, data }) { };
HttpMessageHandler.prototype.receive = function({ callback }) { };
module.exports = { HttpMessageHandler };


