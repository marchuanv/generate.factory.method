const { createMessage } = require('../../lib/factory/message.factory.js');

xdescribe("when opening an http connection and sending and http request given a hostname and port number", function() {
    it("it should return the server host address", async () => {
        // Arrange
        const { createHttpConnection } = require('../../lib/factory/httpconnection.factory.js');
        const { httpConnection } = createHttpConnection({ 
            timeout: 8000,
            recipientHost: 'localhost',
            recipientPort: 3000,
            userId: 'joe',
            senderHost: 'localhost',
            senderPort: 3000
        });
        await httpConnection.open();
        expect(httpConnection.isOpen()).toBeTruthy();

        // Act
        const { host, port } = httpConnection.getServerAddress();

        // Assert
        expect(`${host}:${port}`).toEqual('localhost:3000');
        httpConnection.close();
        expect(httpConnection.isOpen()).toBeFalsy();
    });

    it("it should respond to a queued request", async () => {
     
        // Arrange
        let _httpRequestMessage = null;
        const { createHttpConnection } = require('../../lib/factory/httpconnection.factory.js');
        const { httpConnection, httpClientMessageQueue, httpServerMessageQueue } = createHttpConnection({ 
            timeout: 8000,
            recipientHost: 'localhost',
            recipientPort: 3000,
            userId: 'joe',
            senderHost: 'localhost',
            senderPort: 3000
        });
        await httpConnection.open();
        expect(httpConnection.isOpen()).toBeTruthy();
        const { message } = createMessage({ 
            recipientHost: 'localhost',
            recipientPort: 3000,
            userId: 'joe',
            data: 'Hello From Client',
            senderHost: 'localhost',
            senderPort: 3000,
            token: null,
            metadata: { path: '/connectiontest' },
            messageStatusCode: 2 //pending
        });
        await httpClientMessageQueue.enqueueHttpRequestMessage({ requestMessage: message });
        httpServerMessageQueue.dequeueHttpRequestMessage().then(async ({ httpRequestMessage }) => {
            _httpRequestMessage = httpRequestMessage;
            const { message } = createMessage({ 
                recipientHost: 'localhost',
                recipientPort: 3000,
                userId: 'joe',
                data: 'Hello From Server',
                senderHost: 'localhost',
                senderPort: 3000,
                token: null,
                metadata: { path: '/connectiontest' },
                messageStatusCode: 0 //success
            });
            await httpServerMessageQueue.enqueueHttpResponseMessage({ responseMessage: message });
        });

        // Act
        const { httpResponseMessage } = await httpClientMessageQueue.dequeueHttpResponseMessage();

        // Assert
        httpConnection.close();
        expect(httpConnection.isOpen()).toBeFalsy();
        expect(_httpRequestMessage).not.toBeNull();
        expect(_httpRequestMessage.getStatusCode).toBeUndefined();
        expect(httpResponseMessage.getStatusCode()).toEqual(200);
        expect(httpResponseMessage.getContent()).toEqual('Hello From Server');
    });
});
