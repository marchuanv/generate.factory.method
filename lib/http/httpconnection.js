const http = require("http");
const dns = require("dns");
const utils = require("utils");
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

    const intervalId = setInterval(async () => {
        
        const { httpRequestMessage } = await httpMessageQueue.dequeueRequestMessage();
        clearInterval(intervalId);
        const recipientAddress = httpRequestMessage.getRecipientAddress();
        const path = httpRequestMessage.getPath();
        const headers = httpRequestMessage.getHeaders();
        const method = httpRequestMessage.getMethod();
        const id = utils.generateGUID();
        const host = recipientAddress.address || recipientAddress.host;
        const port = recipientAddress.port;

        const httpRequest = http.request({host, port, path, headers, method });
        httpRequest.Id = id;
        httpRequest.setTimeout(timeout);
        httpRequest.on('response', (httpResponse) => {
            httpResponse.Id = id;
            httpResponse.body = '';
            httpResponse.setEncoding('utf8');
            httpResponse.on('error', (error) => {
                reject(error);
            });
            httpResponse.on('data', (chunk) => httpResponse.body += chunk );
            httpResponse.on('end', () => {
                httpMessageQueue.enqueueResponse({ httpResponse });
                resolve();
            });
        });
        httpRequest.on('error',(error) => {
            reject(error);
        });
        httpRequest.end(data);
    },1000);
    
    let server;
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
                const id = utils.generateGUID();
                httpRequest.setTimeout(timeout);
                httpRequest.body = '';
                httpRequest.Id = id;
                httpResponse.Id = id;
                httpRequest.on('error', (error) => {
                   console.log('ERROR: ', error);
                });
                httpRequest.on('data', (chunk) => httpRequest.body += chunk );
                httpRequest.on('end', () => {
                    httpMessageQueue.enqueueRequest({ httpRequest });
                    const { httpResponseMessage } = await httpMessageQueue.dequeueResponseMessage();
                    httpResponse.writeHead(
                        httpResponseMessage.getStatusCode(),
                        httpResponseMessage.getStatusMessage(),
                        httpResponseMessage.getHeaders()
                    ).end(httpResponseMessage.getContent());
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