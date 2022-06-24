const http = require("http");
const dns = require("dns");
const utils = require("utils");
const errorMessages = require("../errormessages");
const { HttpRequestMessage } = require("./httprequestmessage");
const { HttpResponseMessage } = require("./httpresponsemessage");

function HttpConnection() {
    let server;
    Object.defineProperty(this, 'send', { writable: false, value: ({ host, port, httpRequestMessage }) => {
        if (!(httpRequestMessage instanceof HttpRequestMessage)) {
            throw new Error("the 'httpRequestMessage' parameter is null, undefined or not of type: HttpRequestMessage");
        }
        return new Promise((resolve) => {
            const headers = httpRequestMessage.getHeaders();
            const httpRequest = http.request({ hostname: host, port, path: '/', method: 'POST', headers });
            httpRequest.on('response', (response) => {
                let responseBody = '';
                response.setEncoding('utf8');
                response.on('error', error => errorMessages.add(error));
                response.on('data', (chunk) => responseBody += chunk );
                response.on('end', async () => {
                    console.log('server responded to http request');
                    const responseHeaders = response.headers;
                    resolve({ responseBody, responseHeaders });
                });
            });
            httpRequest.on('error',(error) => errorMessages.add(error));
            httpRequest.end(httpRequestMessage.getContent());
        });
    }});
    Object.defineProperty(this, 'receive', { writable: false, value: ({ callback }) => {
        server.on("request", async (httpRequest, httpResponse) => {
            let requestBody='';
            httpRequest.on('error', error => errorMessages.add(error));
            httpRequest.on('data', (chunk) => requestBody += chunk );
            httpRequest.on('end', () => {
                console.log('http sever received request');
                const requestHeaders = httpRequest.headers;
                callback({ requestBody, requestHeaders, complete: ({ httpResponseMessage }) => {
                    if (!(httpResponseMessage instanceof HttpResponseMessage)) {
                        throw new Error("the 'httpResponseMessage' parameter is null, undefined or not of type: HttpResponseMessage");
                    }
                    httpResponse.writeHead(httpResponseMessage.getStatusCode(), httpResponseMessage.getStatusMessage(), httpResponseMessage.getHeaders()).end(httpResponseMessage.getContent());
                }});
            });
        });
    }});
    Object.defineProperty(this, 'isOpen', { writable: false, value: () => {
        return server.listening;
    }});
    Object.defineProperty(this, 'open', { writable: false, value: ({ host, port }) => {
        const optionsStr = utils.getJSONString({ host, port });
        const options = utils.getJSONObject(optionsStr);
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
        server.on("listening", () => console.log('listening on ', options));
        server.listen(options);
    }});
    Object.defineProperty(this, 'getHostInfo', { writable: false, value: () => {
        return server.address();
    }});
    Object.defineProperty(this, 'close', { writable: false, value: () => {
        server.close();
    }});
}
HttpConnection.prototype.send = function({ httpRequestMessage }) { };
HttpConnection.prototype.receive = function() { };
HttpConnection.prototype.open = function({ host, port }) { };
module.exports = { HttpConnection };