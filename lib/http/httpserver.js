const http = require("http");
const utils = require('utils');
const dns = require('dns');

function HttpServer({ senderAddress, logger, timeout }) {
    let callbacks = [];
    const { senderHost, senderPort } = senderAddress;
    const options = { host: senderHost, port: senderPort };
    const server = http.createServer();
    server.on("error", (error) => {
        if (options.host){
            dns.lookup(options.host, (dnsErr) => {
                if (dnsErr){
                    logger.log({ date: new Date(), context: 'HttpServer', text: dnsErr.message });
                } else {
                    logger.log({ date: new Date(), context: 'HttpServer', text: error.message });
                }
            });
        } else {
            logger.log({ date: new Date(), context: 'HttpServer', text: 'host not specified' });
        }
    });
    server.on("request", (httpRequest, httpResponse) => {
        httpRequest.setTimeout(timeout);
        httpRequest.body = '';
        httpRequest.on('error', (error) => console.error(error));
        httpRequest.on('data', (chunk) => httpRequest.body += chunk );
        httpRequest.on('end', async () => {
            const callback = callbacks.pop();
            let { body, headers, path } = httpRequest;
            ({ body, headers, statusCode, statusMessage } = await callback({ body, headers, path }) || { });
            httpResponse.writeHead(statusCode, statusMessage, headers).end(body);
            callbacks.push(callback);
        });
    });
    server.on("listening", () => logger.log({ date: new Date(), context: 'HttpServer', text: `listening on: ${utils.getJSONString(options)}`}));
    server.listen(options);
    Object.defineProperty(this, 'receiveRequest', { configurable: false, writable: false, value: ({ callback }) => {
        callbacks.push(callback)
    }});
}
HttpServer.prototype.receiveRequest = function({ callback }) { };
module.exports = { HttpServer };
