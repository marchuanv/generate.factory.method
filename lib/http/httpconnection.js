const http = require("http");
const dns = require("dns");
const utils = require("utils");
const { ErrorMessages } = require("../errormessages");
const { HttpRequestMessage } = require("./httprequestmessage");
const { HttpResponseMessage } = require("./httpresponsemessage");

function HttpConnection({ host, port, errorMessages }) {
    const optionsStr = utils.getJSONString({ host, port });
    const options = utils.getJSONObject(optionsStr);
    if (!(errorMessages instanceof ErrorMessages)) {
        throw new Error("the 'errorMessages' parameter is null, undefined or not of type: ErrorMessages");
    }
    Object.defineProperty(this, 'send', { writable: false, value: ({ httpRequestMessage }) => {
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
        const server = http.createServer();
        server.on("error", async (hostError) => {
            if (host){
                dns.lookup(host, async (dnsErr) => {
                    if (dnsErr){
                        throw new Error(`error hosting on ${this.host}:${this.port}, error: ${dnsErr.message}`);
                    }
                });
            } else {
                throw new Error(`error hosting on ${this.host}:${this.port}, error: ${hostError.message}`);
            }
        });
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
                    server.close();
                }});
            });
        });
        server.on("listening", async () => console.log('listening on ', options));
        server.listen(options);
    }});
    Object.defineProperty(this, 'getHostInfo', { writable: false, value: () => {
        return options;
    }});
}
HttpConnection.prototype.send = function({ httpRequestMessage }) { };
HttpConnection.prototype.receive = function() { };
module.exports = { HttpConnection };