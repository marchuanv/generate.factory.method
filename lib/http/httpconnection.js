const http = require("http");
const dns = require("dns");
const utils = require("utils");
const { HttpRequestQueue } = require("./httprequestqueue");

function HttpConnection({ httpRequestQueue, hostAddress, timeout }) {
    if (!(httpRequestQueue instanceof HttpRequestQueue)) {
        throw new Error("the 'httpRequestQueue' parameter is null, undefined or not of type: HttpRequestQueue");
    }
    if(!hostAddress) {
        throw new Error("the 'hostAddress' parameter is null, undefined or not of type: ?");
    }
    if(!timeout) {
        throw new Error("the 'timeout' parameter is null, undefined or not of type: Number");
    }
    let server;
    Object.defineProperty(this, 'send', { writable: false, value: ({ address, path, headers, method, data }) => {
        return new Promise((resolve, reject) => {
            const httpRequest = http.request({ address, path, headers, method });
            httpRequest.Id = utils.generateGUID();
            httpRequest.setTimeout(timeout);
            httpRequest.on('response', (httpResponse) => {
                httpResponse.Id = utils.generateGUID();
                httpResponse.body = '';
                httpResponse.setEncoding('utf8');
                httpResponse.on('error', error => {
                    reject(error);
                });
                httpResponse.on('data', (chunk) => httpResponse.body += chunk );
                httpResponse.on('end', () => {
                    httpRequestQueue.enqueue({ httpRequest, httpResponse });
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
            const optionsStr = utils.getJSONString({ host: hostAddress.address, port: hostAddress.port });
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
                httpRequest.setTimeout(timeout);
                httpRequest.body = '';
                httpRequest.Id = utils.generateGUID();
                httpResponse.Id = utils.generateGUID();
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
        return server !== undefined && server !== null && server.listening;
    }});
}
HttpConnection.prototype.send = function({ address, path, headers, method, data }) { };
HttpConnection.prototype.open = function() { };
HttpConnection.prototype.close = function() { };
HttpConnection.prototype.getServerAddress = function() { };
HttpConnection.prototype.isOpen = function() { };
module.exports = { HttpConnection };