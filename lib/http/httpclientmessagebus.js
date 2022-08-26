const http = require("http");
function HttpClientMessageBus({ httpClientMessageBusMessageQueueBinding, timeout }) {
    const messageQueue = httpClientMessageBusMessageQueueBinding.messageQueue;
    (async () => {
        let stop = false;
        messageQueue.dequeueMessage({ queueName: httpClientStopQueueName }).then(() => {
            stop = true;
            messageQueue.queueMessage({ message: {}, queueName: httpClientStoppedQueueName });
        });
        messageQueue.dequeueMessage({ queueName: httpClientStartQueueName }).then( async () => {
            messageQueue.queueMessage({ message: {}, queueName: httpClientStartedQueueName });
            while(true) {
                const { message } = await messageQueue.dequeueMessage({ queueName: httpClientRequestMessagesQueueName });
                if (stop) {
                    break;
                }
                const httpRequestMessage = message;
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
            }
        });
    })();
};
module.exports = { HttpClientMessageBus };
