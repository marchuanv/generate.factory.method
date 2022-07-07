function HttpMessageHandler({ httpConnection, httpMessageQueue }) {
    Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async ({ path, headers, method, data }) => {
        await httpMessageQueue.enqueueRawRequest({ path, headers, method, data });
        return await httpMessageQueue.dequeueResponseMessage();
    }});
    Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: async ({ callback }) => {
        await httpConnection.open();
        const { httpRequestMessage } = await httpMessageQueue.dequeueRequestMessage();
        const { httpResponseMessage } = await callback({ httpRequestMessage });
        await httpConnection.close();
        await httpMessageQueue.enqueueResponseMessage({ httpResponseMessage });
    }});
}
HttpMessageHandler.prototype.send = async function({ path, headers, method, data }) { };
HttpMessageHandler.prototype.receive = function({ callback }) { };
module.exports = { HttpMessageHandler };


