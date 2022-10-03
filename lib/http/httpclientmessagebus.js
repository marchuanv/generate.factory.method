const http = require("http");
const { HttpClientMessageBus } = require("./httpclientmessagebus.prototype");
HttpClientMessageBus.prototype.constructor = function({ 
    factoryContainerBindingName,
    httpClientRequestMessageQueueBinding,
    httpClientResponseMessageQueueBinding,
    httpClientStartMessageQueueBinding,
    httpClientStartedMessageQueueBinding,
    httpClientStopMessageQueueBinding,
    timeout
}) {

    const dequeueRequestMessage = async ({ callback }) => {
        const { message } = await httpClientRequestMessageQueueBinding.dequeueMessage();
        await callback({ message });
        await dequeueRequestMessage({ callback });
    };
    
    httpClientStopMessageQueueBinding.dequeueMessage().then(({ message }) => {
        if (message.factoryContainerBindingName !== factoryContainerBindingName) {
            httpClientStopMessageQueueBinding.queueMessage({ message });
        } else {
            httpClientRequestMessageQueueBinding.unbind();
            httpClientResponseMessageQueueBinding.unbind();
        }
    });

    httpClientStartMessageQueueBinding.dequeueMessage().then( async () => {
        httpClientStartedMessageQueueBinding.queueMessage({ message: { factoryContainerBindingName } });
        dequeueRequestMessage({ callback: ({ message }) => {
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
                httpClientRequestMessageQueueBinding.queueMessage({ message });
                console.log(error)
            });
            httpRequest.end(data);
        }});
    });
};
module.exports = { HttpClientMessageBus };