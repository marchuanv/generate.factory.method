function HttpMessageHandler({ httpConnection, messageQueue }) {
    Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async ({ path, headers, method, data }) => {
        await messageQueue.enqueueRawRequest({ path, headers, method, data });
        return await messageQueue.dequeueResponseMessage();
    }});
    Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: async ({ callback }) => {
        await httpConnection.open();
        const { httpRequestMessage } = await messageQueue.dequeueRequestMessage();
        const { httpResponseMessage } = await callback({ httpRequestMessage });
        await httpConnection.close();
        await messageQueue.enqueueResponseMessage({ httpResponseMessage });
    }});
}
HttpMessageHandler.prototype.send = async function({ path, headers, method, data }) { };
HttpMessageHandler.prototype.receive = function({ callback }) { };
module.exports = { HttpMessageHandler };


