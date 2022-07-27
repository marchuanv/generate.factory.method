const { createMessage } = require('../../lib/factory/message.factory.js');

describe("when opening an http connection and sending and http request given a hostname and port number", function() {
    
    it("it should return the server host address", async () => {
        // Arrange
        const { createHttpConnection } = require('../../lib/factory/httpconnection.factory.js');
        const { httpConnection } = createHttpConnection({ 
            timeout: 8000,
            messageQueueTypeCode: 1,
            senderHost: 'localhost',
            senderPort: 3000
        });
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
        let _httpRequestMessage = null;
        const { createHttpConnection } = require('../../lib/factory/httpconnection.factory.js');
        const { httpConnection, httpClientMessageQueue, httpServerMessageQueue } = createHttpConnection({ 
            timeout: 8000,
            messageQueueTypeCode: 1,
            senderHost: 'localhost',
            senderPort: 3000
        });
        await httpConnection.open();
        expect(httpConnection.isOpen()).toBeTruthy();
        await httpClientMessageQueue.enqueueHttpRequestMessage(createMessage({ 
            recipientHost: 'localhost',
            recipientPort: 3000,
            data: 'Hello From Client',
            metadata: {
                path: '/connectiontest',
                userId: 'joe',
                secret: "secret1234",
                remoteBase64RSAPublicKey: "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0NCk1JR2VNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0R01BRENCaUFLQmdHTldFenp0b3JYcmJoSmxEdTBQaFlvUGxHZXN5bXowR0Z6czFvSEVUQ1lwWnY1TkxEaVpiNzFtNlpKY2RhSlZmSHJ2dTVxNDN6SGdObU84K0lMeE9tdFVLZnJBOHR1azcwSFl0QllCU05tZGVCZGRHSnZQYjVndFRiMksxUCtNY3VuUzVUbmw2U2RBZDFkVUdva1BGeEFwS3JGbkFPaHpWd0dEbUMvZE50QkhBZ01CQUFFPQ0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t",
            },
            messageStatusCode: 2, //pending
            senderHost: 'localhost',
            senderPort: 3000
        }));
        httpServerMessageQueue.dequeueHttpRequestMessage().then(async ({ httpRequestMessage }) => {
            _httpRequestMessage = httpRequestMessage;
            await httpServerMessageQueue.enqueueHttpResponseMessage(createMessage({ 
                recipientHost: 'localhost',
                recipientPort: 3000,
                data: 'Hello From Server',
                metadata: { 
                    userId: 'joe',
                    path: '/connectiontest',
                    secret: "secret1234",
                    remoteBase64RSAPublicKey: "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0NCk1JR2VNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0R01BRENCaUFLQmdHTldFenp0b3JYcmJoSmxEdTBQaFlvUGxHZXN5bXowR0Z6czFvSEVUQ1lwWnY1TkxEaVpiNzFtNlpKY2RhSlZmSHJ2dTVxNDN6SGdObU84K0lMeE9tdFVLZnJBOHR1azcwSFl0QllCU05tZGVCZGRHSnZQYjVndFRiMksxUCtNY3VuUzVUbmw2U2RBZDFkVUdva1BGeEFwS3JGbkFPaHpWd0dEbUMvZE50QkhBZ01CQUFFPQ0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t",
                },
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
        expect(httpResponseMessage.getContent()).toEqual('Hello From Server');
    });
});
