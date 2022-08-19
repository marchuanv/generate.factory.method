const http = require("http");
const utils = require("utils");
function HttpClientMessageBus({ messageQueue, timeout }) {
    const httpClientRequestMessagesQueueName = 'httpClientRequestMessages';
    const httpClientResponseQueueName = 'httpClientResponse';
    messageQueue.bind({ queueName: httpClientRequestMessagesQueueName });
    messageQueue.bind({ queueName: httpClientResponseQueueName });
    Object.defineProperty(this, 'start', { configurable: false, writable: false, value: () => {
        messageQueue.dequeueMessage({ queueName: httpClientRequestMessagesQueueName }).then(({ httpRequestMessage }) => {
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
                httpResponse.on('error', (error) => console.error(error));
                httpResponse.on('data', (chunk) => httpResponse.body += chunk );
                httpResponse.on('end', async () => {
                    await messageQueue.queueMessage({ message: httpResponse, queueName: httpClientResponseQueueName });
                });
            });
            httpRequest.on('error', (error) => console.error(error));
            httpRequest.end(data);
            this.start();
        });
    }});
    Object.defineProperty(this, 'stop', { configurable: false, writable: false, value: () => {

    }});
};
HttpClientMessageBus.prototype.start = function() { };
HttpClientMessageBus.prototype.stop = function () { };
module.exports = { HttpClientMessageBus };
