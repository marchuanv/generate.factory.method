const http = require("http");
const dns = require("dns");
const utils = require("utils");

function HttpMessageBus({ httpClientMessageQueue, httpServerMessageQueue, senderAddress, timeout }) {
    let server;
    const { createEventPublisher } = require('../factory/eventpublisher.factory.js');
    const { createEventSubscription } = require('../factory/eventsubscription.factory.js');
    {
        const { eventSubscription } = createEventSubscription({ eventCode: 4 });
        eventSubscription.subscribe({ callback: async () => {
            const { httpRequestMessage } = await httpClientMessageQueue.dequeueHttpRequestMessage();
            const { recipientHost, recipientPort } = httpRequestMessage.getRecipientAddress();
            const path = httpRequestMessage.getPath();
            const headers = httpRequestMessage.getHeaders();
            const method = httpRequestMessage.getMethod();
            const data = httpRequestMessage.getEncryptedContent();
            const httpRequest = http.request({host: recipientHost, port: recipientPort, path, headers, method });
            httpRequest.setTimeout(timeout);
            httpRequest.on('response', (httpResponse) => {
                httpResponse.body = '';
                httpResponse.setEncoding('utf8');
                httpResponse.on('error', (error) => {
                    const { eventPublisher } = createEventPublisher({ eventCode: 5, eventSource: 'HttpMessageBus', eventDescription: error });
                    eventPublisher.publish();
                });
                httpResponse.on('data', (chunk) => httpResponse.body += chunk );
                httpResponse.on('end', async () => {
                    await httpClientMessageQueue.enqueueHttpResponse({ httpResponse });
                });
            });
            httpRequest.on('error',(error) => { 
                const { eventPublisher } = createEventPublisher({ eventCode: 6, eventSource: 'HttpMessageBus', eventDescription: error });
                eventPublisher.publish();
            });
            httpRequest.end(data);
        }});
    }
    { 
        const { eventSubscription } = createEventSubscription({ eventCode: 1 });
        eventSubscription.subscribe({ callback: () => {
            const host = senderAddress.senderHost;
            const port = senderAddress.senderPort;
            const options = { host, port };
            server = http.createServer();
            server.on("error", async (error) => {
                if (host){
                    dns.lookup(host, async (dnsErr) => {
                        if (dnsErr){
                            const { eventPublisher } = createEventPublisher({ eventCode: 7, eventSource: 'HttpMessageBus', eventDescription: dnsErr });
                            eventPublisher.publish();
                        }
                    });
                } else {
                    const { eventPublisher } = createEventPublisher({ eventCode: 7, eventSource: 'HttpMessageBus', eventDescription: error });
                    eventPublisher.publish();
                }
            });
            server.on("request", (httpRequest, httpResponse) => {
                httpRequest.setTimeout(timeout);
                httpRequest.body = '';
                httpRequest.on('error', (error) => {
                    const { eventPublisher } = createEventPublisher({ eventCode: 2, eventSource: 'HttpMessageBus', eventDescription: error });
                    eventPublisher.publish();
                });
                httpRequest.on('data', (chunk) => httpRequest.body += chunk );
                httpRequest.on('end', async () => {
                    await httpServerMessageQueue.enqueueHttpRequest({ httpRequest });
                    const { httpResponseMessage } = await httpServerMessageQueue.dequeueHttpResponseMessage();
                    httpResponse.writeHead(
                        httpResponseMessage.getStatusCode(),
                        httpResponseMessage.getStatusMessage(),
                        httpResponseMessage.getHeaders()
                    ).end(httpResponseMessage.getEncryptedContent());
                });
            });
            server.on("listening",async () => {
                const { eventPublisher } = createEventPublisher({ eventCode: 3, eventSource: 'HttpMessageBus', eventDescription: `listening on: ${options}` });
                eventPublisher.publish();
            });
            server.listen(options);
        }});
    }
    {
        const { eventSubscription } = createEventSubscription({ eventCode: 8 });
        eventSubscription.subscribe({ callback: async () => {
            await server.close();
            const { eventPublisher } = createEventPublisher({ eventCode: 9, eventSource: 'HttpMessageBus', eventDescription: 'Http Message Bus Server Stopped' });
            await eventPublisher.publish();
        }});
    }
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
HttpMessageBus.prototype.getServerAddress = function() { };
HttpMessageBus.prototype.isOpen = function() { };
module.exports = { HttpMessageBus };
