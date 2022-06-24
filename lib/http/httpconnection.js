const http = require("http");
const dns = require("dns");
const utils = require("utils");
const { HttpRequestQueue } = require("./httprequestqueue");

function HttpConnection({ httpRequestQueue }) {
    if (!(httpRequestQueue instanceof HttpRequestQueue)) {
        throw new Error("the 'httpRequestQueue' parameter is null, undefined or not of type: HttpRequestQueue");
    }
    let server;
    Object.defineProperty(this, 'send', { writable: false, value: ({ host, port, path, headers, method, data }) => {
        const httpRequest = http.request({ hostname: host, port, path, headers, method });
        httpRequest.on('response', (httpResponse) => {
            httpResponse.setEncoding('utf8');
            httpResponse.on('error', error => httpRequestQueue.enqueue({ httpRequest, httpResponse, error }));
            httpResponse.on('data', (chunk) => httpResponse.body += chunk );
            httpResponse.on('end', async () => {
                httpRequestQueue.enqueue({ httpRequest, httpResponse});
            });
        });
        httpRequest.on('error',(error) => httpRequestQueue.enqueue({ httpRequest, httpResponse: null, error }));
        httpRequest.end(data);
    }});
    Object.defineProperty(this, 'open', { writable: false, value: ({ host, port }) => {
        return new Promise((resolve) => {
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
            server.on("request", async (httpRequest, httpResponse) => {
                httpRequest.on('error', error => httpRequestQueue.enqueue({ httpRequest, httpResponse, error }));
                httpRequest.on('data', (chunk) => httpRequest.body += chunk );
                httpRequest.on('end', () => httpRequestQueue.enqueue({ httpRequest, httpResponse }));
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
        return server.listening;
    }});
}
HttpConnection.prototype.send = function({ host, port, path, headers, method, data }) { };
HttpConnection.prototype.open = function({ host, port }) { };
HttpConnection.prototype.close = function() { };
HttpConnection.prototype.getServerAddress = function() { };
HttpConnection.prototype.isOpen = function() { };
module.exports = { HttpConnection };