const http = require("http");
const dns = require("dns");
const utils = require("utils");

function HttpConnection({ httpMessageQueue, hostAddress, timeout }) {
    const intervalId = setInterval(async () => {
        
        const { httpRequestMessage } = await httpMessageQueue.dequeueRequestMessage();
        clearInterval(intervalId);
        const { address, port } = httpRequestMessage.getSenderAddress();
        const path = httpRequestMessage.getPath();
        const headers = httpRequestMessage.getHeaders();
        const method = httpRequestMessage.getMethod();
        const id = utils.generateGUID();
        const data = httpRequestMessage.getContent();
        const host = address;

        const httpRequest = http.request({host, port, path, headers, method });
        httpRequest.Id = id;
        httpRequest.setTimeout(timeout);
        httpRequest.on('response', (httpResponse) => {
            httpResponse.Id = id;
            httpResponse.body = '';
            httpResponse.setEncoding('utf8');
            httpResponse.on('error', (error) => {
                console.log('CLIENT ERROR: ', error);
            });
            httpResponse.on('data', (chunk) => httpResponse.body += chunk );
            httpResponse.on('end', () => {
                httpMessageQueue.enqueueResponseMessage({ httpResponse });
            });
        });
        httpRequest.on('error',(error) => {
            console.log('CLIENT ERROR: ', error);
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
                   console.log('SERVER ERROR: ', error);
                });
                httpRequest.on('data', (chunk) => httpRequest.body += chunk );
                httpRequest.on('end', async () => {
                    httpMessageQueue.enqueueRequestMessage({ httpRequest });
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
