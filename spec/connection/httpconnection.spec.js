const utils = require('utils');
describe("when opening an http connection and sending and http request given a hostname and port number", function() {

    let token = null;

    beforeAll(() => {
        const userId = 'httpconnectiontest';
        const secret = 'httpconnectiontest1234';
        const { createSharedUserSessions } = require('../../lib/factory/sharedusersessions.factory.js');
        const { sharedUserSessions } = createSharedUserSessions({});
        const { userSecurity } = sharedUserSessions.ensureSession({ userId });
        userSecurity.register({ secret });
        ({ token } = userSecurity.authenticate({ secret }));
    });

    it("it should return the server host address", async () => {

        // Arrange
        const { createHttpConnection } = require('../../lib/factory/httpconnection.factory.js');
        const { httpConnection } = createHttpConnection({ timeout: 15000, senderHost: 'localhost', senderPort: 3000 });
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
            messageQueueContextId: "httpconnection.spec.js",
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
            metadata: { path: '/connectiontest' },
            token,
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
                metadata: {  path: '/connectiontest' },
                token,
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
