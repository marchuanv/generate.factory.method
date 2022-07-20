const http = require("http");
const dns = require("dns");
const utils = require("utils");

async function waitForClientHttpRequests({ httpClientMessageQueue, timeout, isOpen }) {
    if (!isOpen()) {
        return;
    }
    console.log(`HttpConnection Client: Waiting for Http Requests`);
    const { httpRequestMessage } = await httpClientMessageQueue.dequeueHttpRequestMessage();
    console.log(`HttpConnection Client: Sending Http Request`);
    
    const { recipientHost, recipientPort } = httpRequestMessage.getRecipientAddress();
    const path = httpRequestMessage.getPath();
    const headers = httpRequestMessage.getHeaders();
    const method = httpRequestMessage.getMethod();
    const data = httpRequestMessage.getContent();
    const id = utils.generateGUID();

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
        httpResponse.on('end', async () => {
            await httpClientMessageQueue.enqueueHttpResponse({ httpResponse });
        });
    });
    httpRequest.on('error',(error) => {
        console.log('CLIENT ERROR: ', error);
    });
    httpRequest.end(data);
    await waitForClientHttpRequests({ httpClientMessageQueue, timeout, isOpen });
}

function HttpConnection({ httpClientMessageQueue, httpServerMessageQueue, senderAddress, timeout }) {
    let server;
    Object.defineProperty(this, 'open', { configurable: false, writable: false, value: () => {
        return new Promise((resolve) => {
            const host = senderAddress.senderHost;
            const port = senderAddress.senderPort;
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
                    console.log(`HttpConnection Server: Http Request Received`);
                    await httpServerMessageQueue.enqueueHttpRequest({ httpRequest });
                    console.log(`HttpConnection Server: Http Request Queued, Waiting For Http Response Message`);
                    const { httpResponseMessage } = await httpServerMessageQueue.dequeueHttpResponseMessage();
                    console.log(`HttpConnection Server: Http Response Received, Writing Response...`);
                    httpResponse.writeHead(
                        httpResponseMessage.getStatusCode(),
                        httpResponseMessage.getStatusMessage(),
                        httpResponseMessage.getHeaders()
                    ).end(httpResponseMessage.getContent());
                });
            });
            server.on("listening", () => {
                console.log('listening on ', options);
                waitForClientHttpRequests({ httpClientMessageQueue, timeout, isOpen: this.isOpen });
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
    Object.defineProperty(this, 'isOpen', { configurable: false, writable: false, value: () => {
        return server !== undefined && server !== null && server.listening;
    }});
}
HttpConnection.prototype.open = function() { };
HttpConnection.prototype.close = function() { };
HttpConnection.prototype.getServerAddress = function() { };
HttpConnection.prototype.isOpen = function() { };
module.exports = { HttpConnection };
