const http = require("http");
function HttpClientMessageBus({ scopeId, httpClientRequestMessageQueueBinding, httpClientResponseMessageQueueBinding, httpClientStartMessageQueueBinding, httpClientStartedMessageQueueBinding, httpClientStopMessageQueueBinding, httpClientStoppedMessageQueueBinding, timeout }) {
    let stop = false;
    httpClientStopMessageQueueBinding.dequeueMessage().then(({ message }) => {
        const _scopeId = scopeId;
        {
            const { scopeId } = message;
            if (scopeId === _scopeId) {
                stop = true;
                httpClientStoppedMessageQueueBinding.queueMessage({ message: { scopeId } });
            } else {
                httpClientStopMessageQueueBinding.queueMessage({ message: { scopeId } });
            }
        }
    });
    httpClientStartMessageQueueBinding.dequeueMessage().then( async () => {
        httpClientStartedMessageQueueBinding.queueMessage({ message: { scopeId } });
        while(!stop) {
            const { message } = await httpClientRequestMessageQueueBinding.dequeueMessage();
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
                    await httpClientResponseMessageQueueBinding.queueMessage({ message: httpResponse });
                });
            });
            httpRequest.on('error', (error) => console.error(error));
            httpRequest.end(data);
        }
    });
};
module.exports = { HttpClientMessageBus };
