function HttpMessageHandler({ httpConnection, messageQueue }) {
    Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async ({ path, headers, method, data }) => {
        console.log('HttpMessageHandler: Sending Http Request And Waiting For Http Response');
        await messageQueue.enqueueRawHttpRequest({ path, headers, method, data });
        return await messageQueue.dequeueHttpResponseMessage();
    }});
    Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: async ({ callback }) => {
        console.log('HttpMessageHandler: Sending Http Request And Waiting For Http Response');
        await httpConnection.open();
        const { httpResponseMessage } = await messageQueue.dequeueHttpResponseMessage();
        // const { httpResponseMessage } = await callback({ httpRequestMessage });
        //await httpConnection.close();
        // await messageQueue.enqueueHttpResponseMessage({ httpResponseMessage });
    }});
}
HttpMessageHandler.prototype.send = async function({ path, headers, method, data }) { };
HttpMessageHandler.prototype.receive = function({ callback }) { };
module.exports = { HttpMessageHandler };


