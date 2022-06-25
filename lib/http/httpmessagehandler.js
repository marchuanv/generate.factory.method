const { HttpMessageFactory } = require("./httpmessagefactory");
const { HttpConnection } = require("./httpconnection");
const { MessageStatus } = require("../messagestatus");
const { HttpRequestQueue } = require("../../lib/http/httprequestqueue");
function HttpMessageHandler({ httpMessageFactory, httpConnection, httpRequestQueue }) {
    if (!(httpMessageFactory instanceof HttpMessageFactory)) {
        throw new Error("the 'httpMessageFactory' parameter is null, undefined or not of type: HttpMessageFactory");
    }
    if (!(httpConnection instanceof HttpConnection)) {
        throw new Error("the 'httpConnection' parameter is null, undefined or not of type: HttpConnection");
    }
    if (!httpConnection.isOpen()) {
        throw new Error("http connection is not open.");
    }
    if (!(httpRequestQueue instanceof HttpRequestQueue)) {
        throw new Error("the 'httpRequestQueue' parameter is undefined, null or not of type: HttpRequestQueue");
    }
    Object.defineProperty(this, 'send', { writable: false, value: async ({ host, port, data }) => {
        httpConnection.send({
            host,
            port,
            path: '/',
            headers: {},
            method: 'POST',
            timeout: 10000,
            data
        });
        const { httpResponse, error } = httpRequestQueue.dequeue();
        if (error) {
            throw(error);
        }
        const responseBody = httpResponse.body;
        const headers = httpResponse.headers;
        return httpMessageFactory.createHttpResponseMessage({ 
            fromHost,
            data: responseBody,
            headers,
            messageStatus: new MessageStatus({ code: 0 }) 
        });
    }});
    Object.defineProperty(this, 'receive', { writable: false, value: ({ callback }) => {
        const { httpRequest, httpResponse, error } = httpRequestQueue.dequeue();
        const address = httpConnection.getServerAddress();
        const httpRequestMessage = httpMessageFactory.createHttpRequestMessage({ 
            address,
            data: httpRequest.body,
            headers: httpRequest.headers
        });
        const httpResponseMessage = await callback({ httpRequestMessage });
        httpResponse.writeHead(
            httpResponseMessage.getStatusCode(),
            httpResponseMessage.getStatusMessage(),
            httpResponseMessage.getHeaders()
        ).end(httpResponseMessage.getContent());
    }});
}
HttpMessageHandler.prototype.send = async function({ host, port, data }) { };
HttpMessageHandler.prototype.receive = function({ callback }) { };
module.exports = { HttpMessageHandler };


