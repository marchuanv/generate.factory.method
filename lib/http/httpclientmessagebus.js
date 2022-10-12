const http = require("http");
const { HttpClientMessageBus } = require("./httpclientmessagebus.prototype");
HttpClientMessageBus.prototype.constructor = function({ 
    factoryContainerBindingName,
    httpClientRequestMessageQueueBinding,
    httpClientResponseMessageQueueBinding,
    httpClientStartMessageQueueBinding,
    httpClientStartedMessageQueueBinding,
    httpClientStopMessageQueueBinding,
    httpClientStoppedMessageQueueBinding,
    timeout
}) {

    let started = false;
    httpClientStopMessageQueueBinding.dequeueMessage().then(({ message }) => {
        if (message.factoryContainerBindingName === factoryContainerBindingName) {
            httpClientRequestMessageQueueBinding.unbind();
            httpClientResponseMessageQueueBinding.unbind();
            httpClientStoppedMessageQueueBinding.queueMessage({ message });
            started = false;
        } else {
            httpClientStopMessageQueueBinding.queueMessage({ message });
        }
    });

    httpClientStartMessageQueueBinding.dequeueMessage().then(() => {
        started = true;
        httpClientStartedMessageQueueBinding.queueMessage({ message: { factoryContainerBindingName } });
        const intervalId = setInterval( async ()=> {
            if (!started) {
                clearInterval(intervalId);
                return;
            }
            const { message } = await httpClientRequestMessageQueueBinding.dequeueMessage();
            if (!started) {
                clearInterval(intervalId);
                return;
            }
            const httpRequestMessage = message;
            const { recipientAddress } = httpRequestMessage.getRecipientAddress();
            const { recipientHost, recipientPort } = recipientAddress;
            const path = httpRequestMessage.getPath();
            const headers = httpRequestMessage.getHeaders();
            const method = httpRequestMessage.getMethod();
            const data = httpRequestMessage.getEncryptedContent();
            const httpRequest = http.request({host: recipientHost, port: recipientPort, path, headers, method });
            httpRequest.setTimeout(timeout);
            httpRequest.on('response', async (httpResponse) => {
                httpResponse.setEncoding('utf8');
                httpResponse.on('error', (error) => console.error(error));
                httpResponse.body = '';
                for await (const chunk of httpResponse) {
                    httpResponse.body += chunk
                }
                await httpClientResponseMessageQueueBinding.queueMessage({ message: httpResponse });
            });
            httpRequest.on('error', (error) => {
                httpClientStopMessageQueueBinding.queueMessage({ message: { factoryContainerBindingName } });
                console.log(error);
            });
            httpRequest.end(data);
        }, 1000);
    });
};
module.exports = { HttpClientMessageBus };