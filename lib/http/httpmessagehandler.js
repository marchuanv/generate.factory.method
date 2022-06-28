const { HttpMessageFactory } = require("./httpmessagefactory");
const { HttpConnection } = require("./httpconnection");
const { MessageStatus } = require("../messagestatus");
const { HttpRequestQueue } = require("../../lib/http/httprequestqueue");
const { HttpResponseQueue } = require("../../lib/http/httpresponsequeue");
function HttpMessageHandler({ httpMessageFactory, httpConnection, httpRequestQueue, httpResponseQueue }) {
    if (!(httpMessageFactory instanceof HttpMessageFactory)) {
        throw new Error("the 'httpMessageFactory' parameter is null, undefined or not of type: HttpMessageFactory");
    }
    if (!(httpConnection instanceof HttpConnection)) {
        throw new Error("the 'httpConnection' parameter is null, undefined or not of type: HttpConnection");
    }
    if (!(httpRequestQueue instanceof HttpRequestQueue)) {
        throw new Error("the 'httpRequestQueue' parameter is undefined, null or not of type: HttpRequestQueue");
    }
    if (!(httpResponseQueue instanceof HttpResponseQueue)) {
        throw new Error("the 'httpResponseQueue' parameter is undefined, null or not of type: HttpResponseQueue");
    }
    Object.defineProperty(this, 'send', { writable: false, value: async ({ recipientAddress, data }) => {
        await httpConnection.send({
            recipientAddress,
            path: '/',
            headers: {},
            method: 'POST',
            data
        });
        const { httpResponse, error } = await httpResponseQueue.dequeue({ isClient: true });
        if (error) {
            throw(error);
        }
        const responseBody = httpResponse.body;
        const headers = httpResponse.headers;
        return httpMessageFactory.createHttpResponseMessage({ 
            recipientAddress,
            data: responseBody,
            headers,
            messageStatus: new MessageStatus({ code: 0 }) 
        });
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
        throw new Error('get recipientAddress somehow');
        const httpRequestMessage = httpMessageFactory.createHttpRequestMessage({ 
            recipientAddress,
            data: httpRequest.body,
            headers: httpRequest.headers,
            messageStatus: new MessageStatus({ code: 4 })
        });
        const httpResponseMessage = await callback({ httpRequestMessage });
        httpResponse.writeHead(
            httpResponseMessage.getStatusCode(),
            httpResponseMessage.getStatusMessage(),
            httpResponseMessage.getHeaders()
        ).end(httpResponseMessage.getContent());
    }});
}
HttpMessageHandler.prototype.send = async function({ recipientAddress, data }) { };
HttpMessageHandler.prototype.receive = function({ callback }) { };
module.exports = { HttpMessageHandler };


