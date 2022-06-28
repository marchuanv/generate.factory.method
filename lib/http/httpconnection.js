const http = require("http");
const dns = require("dns");
const utils = require("utils");
const { HttpRequestQueue } = require("./httprequestqueue");
const { HttpResponseQueue } = require("./httpresponsequeue");
const { HttpMessageQueue } = require("./httpmessagequeue");

function HttpConnection({ httpMessageQueue, hostAddress, timeout }) {
    if (!(httpMessageQueue instanceof HttpMessageQueue)) {
        throw new Error("the 'httpMessageQueue' parameter is null, undefined or not of type: HttpMessageQueue");
    }
    if(!hostAddress) {
        throw new Error("the 'hostAddress' parameter is null, undefined or not of type: ?");
    }
    if(!timeout) {
        throw new Error("the 'timeout' parameter is null, undefined or not of type: Number");
    }
    let server;
    Object.defineProperty(this, 'send', { writable: false, value: ({ recipientAddress, path, headers, method, data }) => {
        return new Promise((resolve, reject) => {
            const host = recipientAddress.address || recipientAddress.host;
            const port = recipientAddress.port;
            const httpRequest = http.request({host, port, path, headers, method });
            httpRequest.Id = utils.generateGUID();
            httpRequest.setTimeout(timeout);
            httpRequest.on('response', (httpResponse) => {
                httpResponse.Id = utils.generateGUID();
                httpResponse.body = '';
                httpResponse.setEncoding('utf8');
                httpResponse.on('error', (error) => {
                    reject(error);
                });
                httpResponse.on('data', (chunk) => httpResponse.body += chunk );
                httpResponse.on('end', () => {
                    httpMessageQueue.enqueueRequest(httpRequest);
                    httpMessageQueue.enqueueResponse(httpResponse);
                    resolve();
                });
            });
            httpRequest.on('error',(error) => {
                reject(error);
            });
            httpRequest.end(data);
        });
    }});
    Object.defineProperty(this, 'open', { writable: false, value: () => {
        return new Promise((resolve) => {
            const host = hostAddress.address || hostAddress.host;
            const port = hostAddress.port;
            const options = { host, port };
            server = http.createServer();
            server.on("error", async (hostError) => {
                if (host){
                    dns.lookup(host, async (dnsErr) => {
                        if (dnsErr){
                            throw new Error(`error hosting on ${host}:${port}, error: ${dnsErr.message}`);
                        }
                    });
                } else {
                    throw new Error(`error hosting on ${host}:${port}, error: ${hostError.message}`);
                }
            });
            server.on("request", async (httpRequest, httpResponse) => {
                httpRequest.setTimeout(timeout);
                httpRequest.body = '';
                httpRequest.Id = utils.generateGUID();
                httpResponse.Id = utils.generateGUID();
                httpRequest.on('error', (error) => {
                   console.log('ERROR: ', error);
                });
                httpRequest.on('data', (chunk) => httpRequest.body += chunk );
                httpRequest.on('end', () => {
                    httpMessageQueue.enqueueRequest(httpRequest);
                    httpMessageQueue.enqueueResponse(httpResponse);
                });
            });
            server.on("listening", () => {
                console.log('listening on ', options);
                resolve();
            });
            server.listen(options);
        });
    }});
    Object.defineProperty(this, 'close', { writable: false, value: () => {
        server.close();
    }});
    Object.defineProperty(this, 'getServerAddress', { writable: false, value: () => {
        return server.address();
    }});
    Object.defineProperty(this, 'isOpen', { writable: false, value: () => {
        return server !== undefined && server !== null && server.listening;
    }});
}
HttpConnection.prototype.send = function({ recipientAddress, path, headers, method, data }) { };
HttpConnection.prototype.open = function() { };
HttpConnection.prototype.close = function() { };
HttpConnection.prototype.getServerAddress = function() { };
HttpConnection.prototype.isOpen = function() { };
module.exports = { HttpConnection };





        // await httpConnection.send({
        //     recipientAddress,
        //     path: '/',
        //     headers: {},
        //     method: 'POST',
        //     data
        // });
        // const { httpResponse, error } = await httpResponseQueue.dequeue({ isClient: true });
        // if (error) {
        //     throw(error);
        // }
        // const responseBody = httpResponse.body;
        // const headers = httpResponse.headers;
        // return httpMessageFactory.createHttpResponseMessage({ 
        //     data: responseBody,
        //     headers,
        //     messageStatus: new MessageStatus({ code: 0 }) 
        // });