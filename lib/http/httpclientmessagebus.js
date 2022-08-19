const http = require("http");
function HttpClientMessageBus({ messageQueue, timeout }) {
    const httpClientRequestMessagesQueueName = 'httpclientrequestmessages';
    const httpClientResponseQueueName = 'httpclientresponse';
    messageQueue.bind({ queueName: httpClientRequestMessagesQueueName });
    messageQueue.bind({ queueName: httpClientResponseQueueName });
    const waitForMessages = () => {
        messageQueue.dequeueMessage({ queueName: httpClientRequestMessagesQueueName }).then(({ message }) => {
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
            waitForMessages();
        });
    };
    waitForMessages();
};
module.exports = { HttpClientMessageBus };
