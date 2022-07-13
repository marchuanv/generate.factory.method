const http = require("http");
const dns = require("dns");
const utils = require("utils");

const waitForClientHttpRequests = async ({ recipientAddress, messageQueue, timeout  }) => {
    console.log(`HttpConnection Client: Waiting for Http Requests`);
    const { httpRequestMessage } = await messageQueue.dequeueHttpRequestMessage();
    console.log(`HttpConnection Client: Sending Http Request`);
   
    const { recipientHost, recipientPort } = recipientAddress;
    const path = httpRequestMessage.getPath();
    const headers = httpRequestMessage.getHeaders();
    const method = httpRequestMessage.getMethod();
    const id = utils.generateGUID();
    const data = httpRequestMessage.getContent();

    const httpRequest = http.request({host: recipientHost, port: recipientPort, path, headers, method });
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
            messageQueue.enqueueResponseMessage({ httpResponse });
        });
    });
    httpRequest.on('error',(error) => {
        console.log('CLIENT ERROR: ', error);
    });
    httpRequest.end(data);
}

function HttpConnection({ messageQueue, hostAddress, recipientAddress, timeout }) {
    waitForClientHttpRequests({ recipientAddress, messageQueue, timeout });
    let server;
    Object.defineProperty(this, 'open', { configurable: false, writable: false, value: () => {
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
                    console.log(`HttpConnection Server: http request received`);
                    messageQueue.enqueueRequestMessage({ httpRequest });
                    const { httpResponseMessage } = await messageQueue.dequeueHttpResponseMessage();
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
    Object.defineProperty(this, 'close', { configurable: false, writable: false, value: () => {
        server.close();
    }});
    Object.defineProperty(this, 'getServerAddress', { configurable: false, writable: false, value: () => {
        const { address, port } = server.address();
        if (address === '127.0.0.1') {
            return { host: 'localhost', port };    
        }
        return { host: address, port };
    }});
    Object.defineProperty(this, 'getRecipientAddress', { configurable: false, writable: false, value: () => {
        return recipientAddress;
    }});
    Object.defineProperty(this, 'isOpen', { configurable: false, writable: false, value: () => {
        return server !== undefined && server !== null && server.listening;
    }});
}
HttpConnection.prototype.open = function() { };
HttpConnection.prototype.close = function() { };
HttpConnection.prototype.getServerAddress = function() { };
HttpConnection.prototype.getRecipientAddress = function() { };
HttpConnection.prototype.isOpen = function() { };
module.exports = { HttpConnection };
