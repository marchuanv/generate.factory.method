function HttpMessageHandler({ messageQueue }) {
    Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async ({ path, headers, method, data }) => {
        console.log('HttpMessageHandler: Sending Http Request And Waiting For Http Response');
        await messageQueue.enqueueRawHttpRequest({ path, headers, method, data });
        return await messageQueue.dequeueHttpResponseMessage();
    }});
    Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: async ({ callback }) => {
        console.log('HttpMessageHandler: Receiving Http Response And Waiting For Http Response');
        const { requestMessage } = await messageQueue.dequeueHttpRequestMessage();
        const response = await callback({ requestMessage });
        if (response) {
            const { responseMessage } = response;
            await messageQueue.enqueueResponseMessage({ responseMessage });
        } else {
            await messageQueue.enqueueRawHttpResponse({ headers: {}, data: 'success', httpStatusCode: 200 });
        }
    }});
}
HttpMessageHandler.prototype.send = async function({ requestMessage }) { };
HttpMessageHandler.prototype.receive = function({ callback }) { };
module.exports = { HttpMessageHandler };


