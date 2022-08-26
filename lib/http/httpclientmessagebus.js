const http = require("http");
function HttpClientMessageBus({ httpClientRequestMessageQueueBinding, httpClientResponseMessageQueueBinding, httpClientStartMessageQueueBinding, httpClientStartedMessageQueueBinding, httpClientStopMessageQueueBinding, httpClientStoppedMessageQueueBinding, timeout }) {
    (async () => {
        let stop = false;
        httpClientStopMessageQueueBinding.messageQueue.dequeueMessage().then(() => {
            stop = true;
            httpClientStoppedMessageQueueBinding.messageQueue.queueMessage({ message: {} });
        });
        httpClientStartMessageQueueBinding.messageQueue.dequeueMessage().then( async () => {
            httpClientStartedMessageQueueBinding.messageQueue.queueMessage({ message: {} });
            while(true) {
                const { message } = await httpClientRequestMessageQueueBinding.messageQueue.dequeueMessage();
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
                        await httpClientResponseMessageQueueBinding.messageQueue.queueMessage({ message: httpResponse });
                    });
                });
                httpRequest.on('error', (error) => console.error(error));
                httpRequest.end(data);
            }
        });
    })();
};
module.exports = { HttpClientMessageBus };
