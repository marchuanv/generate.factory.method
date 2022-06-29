const { HttpMessageFactory } = require("./httpmessagefactory");
const { HttpConnection } = require("./httpconnection");
const { HttpMessageQueue } = require("../../lib/http/httpmessagequeue");
function HttpMessageHandler({ httpMessageFactory, httpConnection, httpMessageQueue }) {
    if (!(httpMessageFactory instanceof HttpMessageFactory)) {
        throw new Error("the 'httpMessageFactory' parameter is null, undefined or not of type: HttpMessageFactory");
    }
    if (!(httpConnection instanceof HttpConnection)) {
        throw new Error("the 'httpConnection' parameter is null, undefined or not of type: HttpConnection");
    }
    if (!(httpMessageQueue instanceof HttpMessageQueue)) {
        throw new Error("the 'httpMessageQueue' parameter is undefined, null or not of type: HttpMessageQueue");
    }
    Object.defineProperty(this, 'send', { writable: false, value: async ({ path, headers, method, data }) => {
        await httpMessageQueue.enqueueRawRequest({ path, headers, method, data });
        return await httpMessageQueue.dequeueResponseMessage();
    }});
    Object.defineProperty(this, 'receive', { writable: false, value: async ({ callback }) => {
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


