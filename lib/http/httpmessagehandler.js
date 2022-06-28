const { HttpMessageFactory } = require("./httpmessagefactory");
const { HttpConnection } = require("./httpconnection");
const { MessageStatus } = require("../messagestatus");
const { HttpRequestQueue } = require("../../lib/http/httprequestqueue");
const { HttpResponseQueue } = require("../../lib/http/httpresponsequeue");
function HttpMessageHandler({ httpMessageFactory, httpConnection, httpRequestQueue, httpResponseQueue, hostAddress }) {
    if (!(httpMessageFactory instanceof HttpMessageFactory)) {
        throw new Error("the 'httpMessageFactory' parameter is null, undefined or not of type: HttpMessageFactory");
    }
    if (!(httpConnection instanceof HttpConnection)) {
        throw new Error("the 'httpConnection' parameter is null, undefined or not of type: HttpConnection");
    }
    if (!(httpRequestQueue instanceof HttpRequestQueue)) {
        throw new Error("the 'httpRequestQueue' parameter is undefined, null or not of type: HttpRequestQueue");
    }
    if (!hostAddress) {
        throw new Error("the 'hostAddress' parameter is undefined or null");
    }
    if (!(httpResponseQueue instanceof HttpResponseQueue)) {
        throw new Error("the 'httpResponseQueue' parameter is undefined, null or not of type: HttpResponseQueue");
    }
    Object.defineProperty(this, 'send', { writable: false, value: async ({ address, data }) => {
        await httpConnection.send({
            address,
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
            address,
            data: responseBody,
            headers,
            messageStatus: new MessageStatus({ code: 0 }) 
        });
    }});
    Object.defineProperty(this, 'receive', { writable: false, value: async ({ address, callback }) => {
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
            address,
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
HttpMessageHandler.prototype.send = async function({ address, data }) { };
HttpMessageHandler.prototype.receive = function({ address, callback }) { };
module.exports = { HttpMessageHandler };


