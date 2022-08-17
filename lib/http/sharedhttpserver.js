const http = require("http");
const utils = require('utils');
const dns = require('dns');

function SharedHttpServer({ senderAddress, sharedLogger, timeout }) {
    Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: ({ callback }) => {
        const { senderHost, senderPort } = senderAddress;
        const options = { host: senderHost, port: senderPort };
        const server = http.createServer();
        server.on("error", (error) => {
            if (options.host){
                dns.lookup(options.host, (dnsErr) => {
                    if (dnsErr){
                        sharedLogger.log({ date: new Date(), context: 'HttpServer', text: dnsErr.message });
                    } else {
                        sharedLogger.log({ date: new Date(), context: 'HttpServer', text: error.message });
                    }
                });
            } else {
                sharedLogger.log({ date: new Date(), context: 'HttpServer', text: 'host not specified' });
            }
        });
        server.on("request", (httpRequest, httpResponse) => {
            httpRequest.setTimeout(timeout);
            httpRequest.body = '';
            httpRequest.on('error', (error) => console.error(error));
            httpRequest.on('data', (chunk) => httpRequest.body += chunk );
            httpRequest.on('end', async () => {
                let { body, headers, path } = httpRequest;
                ({ body, headers, statusCode, statusMessage } = await callback({ body, headers, path }) || { });
                if (body && headers, statusCode, statusMessage) {
                    httpResponse.writeHead(statusCode, statusMessage, headers).end(body);
                } else {
                    httpResponse.writeHead(400, 'Bad Request',{})
                        .end('{ "text": "Bad Request" }');
                }
            });
        });
        server.on("listening",async () => {
            sharedLogger.log({ date: new Date(), context: 'HttpServer', text: `listening on: ${utils.getJSONString(options)}` });
        });
        server.listen(options);
    }});
}
SharedHttpServer.prototype.receive = function({ callback }) { };
module.exports = { SharedHttpServer };
