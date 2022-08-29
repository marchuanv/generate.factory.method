const http = require("http");
function HttpClientMessageBus({ scopeId, httpClientRequestMessageQueueBinding, httpClientResponseMessageQueueBinding, httpClientStartMessageQueueBinding, httpClientStartedMessageQueueBinding, httpClientStopMessageQueueBinding, httpClientStoppedMessageQueueBinding, timeout }) {

    const dequeueRequestMessage = async ({ callback }) => {
        const { message } = await httpClientRequestMessageQueueBinding.dequeueMessage();
        await callback({ message });
        await dequeueRequestMessage({ callback });
    };
    
    httpClientStopMessageQueueBinding.dequeueMessage().then(({ message }) => {
        if (message.scopeId !== scopeId) {
            httpClientStopMessageQueueBinding.queueMessage({ message });
        } else {
            httpClientRequestMessageQueueBinding.unbind();
            httpClientResponseMessageQueueBinding.unbind();
        }
    });

    httpClientStartMessageQueueBinding.dequeueMessage().then( async () => {
        httpClientStartedMessageQueueBinding.queueMessage({ message: { scopeId } });
        dequeueRequestMessage({ callback: ({ message }) => {
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
        }});
    });
};
module.exports = { HttpClientMessageBus };
