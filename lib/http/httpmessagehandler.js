const { HttpMessageFactory } = require("./httpmessagefactory");
const { HttpConnection } = require("./httpconnection");
const { ErrorMessages } = require("../errormessages");
const { MessageStatus } = require("../messagestatus");
const { HttpResponseMessage } = require("./httpresponsemessage");
function HttpMessageHandler({ httpMessageFactory, httpConnection, errorMessages }) {
    if (!(httpMessageFactory instanceof HttpMessageFactory)) {
        throw new Error("the 'httpMessageFactory' parameter is null, undefined or not of type: HttpMessageFactory");
    }
    if (!(httpConnection instanceof HttpConnection)) {
        throw new Error("the 'httpConnection' parameter is null, undefined or not of type: HttpConnection");
    }
    if (!(errorMessages instanceof ErrorMessages)) {
        throw new Error("the 'errorMessages' parameter is undefined, null or not of type: ErrorMessages");
    }
    Object.defineProperty(this, 'send', { writable: false, value: async ({ data }) => {
        if (!data) {
            throw new Error("the 'data' parameter is null or undefined");
        }
        const hostInfo = httpConnection.getHostInfo();
        const fromHost = `${hostInfo.host}:${hostInfo.port}`;
        const httpRequestMessage = await  httpMessageFactory.createHttpRequestMessage({ fromHost, data, headers: {} });
        await httpRequestMessage.validate();
        if (errorMessages.hasErrors()) {
            throw(errorMessages.getLatest());
        }
        const { responseBody, responseHeaders } = await httpConnection.send({ httpRequestMessage });
        if (errorMessages.hasErrors()) {
            throw(errorMessages.getLatest());
        }
        return httpMessageFactory.createHttpResponseMessage({ 
            fromHost,
            data: responseBody,
            headers: responseHeaders,
            messageStatus: new MessageStatus({ code: 0 }) 
        });
    }});
    Object.defineProperty(this, 'receive', { writable: false, value: ({ callback }) => {
        httpConnection.receive({ callback: async ({ requestBody, requestHeaders, complete }) => {
            const hostInfo = httpConnection.getHostInfo();
            const fromHost = `${hostInfo.host}:${hostInfo.port}`;
            const httpRequestMessage = httpMessageFactory.createHttpRequestMessage({ fromHost, data: requestBody, headers: requestHeaders });
            httpRequestMessage.validate();
            if (errorMessages.hasErrors()) {
                throw(errorMessages.getLatest());
            }
            const httpResponseMessage = await callback({ httpRequestMessage });
            if (!(httpResponseMessage instanceof HttpResponseMessage)) {
                throw new Error("the 'httpResponseMessage' variable is undefined, null or not of type: HttpResponseMessage");
            }
            httpResponseMessage.validate();
            if (errorMessages.hasErrors()) {
                throw(errorMessages.getLatest());
            }
            complete({ httpResponseMessage });
        }});
    }});
}
HttpMessageHandler.prototype.send = async function({ data }) { };
HttpMessageHandler.prototype.receive = function({ callback }) { };
module.exports = { HttpMessageHandler };


                    //httpResponse.writeHead(httpResponseMessage.getStatusCode(), httpResponseMessage.getStatusMessage(), httpResponseMessage.getHeaders()).end(httpResponseMessage.getContent());
