const utils = require('utils');
fdescribe("when opening an http connection and sending and http request given a hostname and port number", function() {

    const userId = 'httpconnectiontest';
    let base64rsapublickey = null;

    beforeAll(() => {
        const secret = 'httpconnectiontest1234';
        const { createSharedUserSessions } = require('../../lib/factory/sharedusersessions.factory.js');
        const { sharedUserSessions } = createSharedUserSessions({});
        const { userSecurity } = sharedUserSessions.ensureSession({ userId });
        userSecurity.register({ secret });
        userSecurity.authenticate({ secret });
        ({ base64RSAPublicKey: base64rsapublickey } = userSecurity.getBase64PublicKey());
    });

    it("it should return the server host address", async () => {

        // Arrange
        const { createHttpConnection } = require('../../lib/factory/httpconnection.factory.js');
        const { httpConnection } = createHttpConnection({ timeout: 8000, messageQueueTypeCode: 1, senderHost: 'localhost', senderPort: 3000 });
        await httpConnection.open();
        expect(httpConnection.isOpen()).toBeTruthy();

        // Act
        const { host, port } = httpConnection.getServerAddress();

        // Assert
        await httpConnection.close();
        expect(`${host}:${port}`).toEqual('localhost:3000');
        expect(httpConnection.isOpen()).toBeFalsy();
        
    });

    it("it should respond to a queued request", async () => {
        // Arrange
        const { createMessage } = require('../../lib/factory/message.factory.js');
        let _httpRequestMessage = null;
        const { createHttpConnection } = require('../../lib/factory/httpconnection.factory.js');
        const { httpConnection, httpClientMessageQueue, httpServerMessageQueue } = createHttpConnection({ 
            timeout: 15000,
            messageQueueTypeCode: 1,
            senderHost: 'localhost',
            senderPort: 3000
        });
        await httpConnection.open();
        expect(httpConnection.isOpen()).toBeTruthy();
        await httpClientMessageQueue.enqueueHttpRequestMessage(createMessage({ 
            recipientHost: 'localhost',
            recipientPort: 3000,
            Id: null,
            data: 'Hello From Client',
            metadata: { path: '/connectiontest', base64rsapublickey },
            userId,
            messageStatusCode: 2, //pending
            senderHost: 'localhost',
            senderPort: 3000
        }));
        httpServerMessageQueue.dequeueHttpRequestMessage().then(async ({ httpRequestMessage }) => {
            _httpRequestMessage = httpRequestMessage;
            await httpServerMessageQueue.enqueueHttpResponseMessage(createMessage({ 
                recipientHost: 'localhost',
                recipientPort: 3000,
                Id: null,
                data: 'Hello From Server',
                metadata: {  path: '/connectiontest', base64rsapublickey },
                userId,
                messageStatusCode: 0, //success
                senderHost: 'localhost',
                senderPort: 3000
            }));
        });

        // Act
        const { httpResponseMessage } = await httpClientMessageQueue.dequeueHttpResponseMessage();

        // Assert
        await httpConnection.close();
        expect(httpConnection.isOpen()).toBeFalsy();
        expect(_httpRequestMessage).not.toBeNull();
        expect(_httpRequestMessage.getStatusCode).toBeUndefined();
        expect(httpResponseMessage.getStatusCode()).toEqual(200);
        expect(utils.getJSONString(httpResponseMessage.getDecryptedContent())).toEqual(utils.getJSONString({ text: 'Hello From Server' }));
    });
});
