const { HttpMessageFactory } = require("./httpmessagefactory");
const { HttpConnection } = require("./httpconnection");
const { MessageStatus } = require("../messagestatus");
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
    Object.defineProperty(this, 'send', { writable: false, value: async ({ recipientAddress, data }) => {
        const messageStatus = new MessageStatus({ code: 2 });
        const httpRequestMessage = httpMessageFactory.createHttpRequestMessage({ data, headers: { sender: recipientAddress }, messageStatus });
        await httpMessageQueue.enqueueRequest({ httpRequestMessage });
        return await httpMessageQueue.dequeueResponse();
    }});
    Object.defineProperty(this, 'receive', { writable: false, value: async ({ callback }) => {
        await httpConnection.open();
        let { httpRequest, error } = await httpRequestQueue.dequeue({ isClient: false });
        if (error) {
            throw(error);
        }
        ({ httpResponse, error } = await httpResponseQueue.dequeue({ isClient: false }));
        if (error) {
            throw(error);
        }
        const httpRequestMessage = httpMessageFactory.createHttpRequestMessage({ 
            data: httpRequest.body,
            headers: httpRequest.headers,
            messageStatus: new MessageStatus({ code: 4 })
        });
        const httpResponseMessage = await callback({ httpRequestMessage });
       
    }});
}
HttpMessageHandler.prototype.send = async function({ recipientAddress, data }) { };
HttpMessageHandler.prototype.receive = function({ callback }) { };
module.exports = { HttpMessageHandler };


