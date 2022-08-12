describe("when sending an http request given a recipient address", function() {

    let token = null;

    beforeAll(() => {
        const userId = 'httpervermessagebus';
        const secret = 'httpervermessagebus1234';
        const { createSharedUserSessions } = require('../../lib/factory/sharedusersessions.factory.js');
        const { sharedUserSessions } = createSharedUserSessions({});
        const { userSecurity } = sharedUserSessions.ensureSession({ userId });
        userSecurity.register({ secret });
        ({ token } = userSecurity.authenticate({ secret }));
    });

    it("it should respond to the http request", (done) => {
        
        // Arrange
        let _httpRequestMessage = null;
        const  contextId = "httpservermessagebustest";
        const { createHttpClientMessageBus } = require('../../lib/factory/httpclientmessagebus.factory.js');
        const { createHttpServerMessageBus } = require('../../lib/factory/httpservermessagebus.factory.js');
        const { createHttpRequestMessage } = require('../../lib/factory/httprequestmessage.factory.js');
        const { createHttpResponseMessage } = require('../../lib/factory/httpresponsemessage.factory.js');
        const { httpClientMessageBus } = createHttpClientMessageBus({ timeout: 15000, contextId, senderHost: 'localhost', senderPort: 3000 });
        const { httpServerMessageBus } = createHttpServerMessageBus({ timeout: 15000, contextId, senderHost: 'localhost', senderPort: 3000 });

        httpServerMessageBus.subscribeToHttpRequestMessages({ callback: ({ httpRequestMessage }) => {
            _httpRequestMessage = httpRequestMessage;
            httpServerMessageBus.publishHttpResponseMessage(createHttpResponseMessage({
                messageStatusCode: 0, //success
                Id: null,
                data: 'Hello From Server',
                recipientHost: 'localhost',
                recipientPort: 3000,
                metadata: { path: '/httpservermessagebustest' },
                token,
                senderHost: 'localhost',
                senderPort: 3000
            }));
        }});

        // Act
        httpClientMessageBus.publishHttpRequestMessage(createHttpRequestMessage({
            messageStatusCode: 2, //pending
            Id: null,
            data: 'Hello From Client',
            recipientHost: 'localhost',
            recipientPort: 3000,
            metadata: { path: '/httpclientmessagebustest' },
            token,
            senderHost: 'localhost',
            senderPort: 3000
        }));

        // Assert
        httpClientMessageBus.subscribeToHttpResponseMessage({ callback: ({ httpResponseMessage }) => {
            expect(_httpRequestMessage).not.toBeNull();
            expect(_httpRequestMessage).not.toBeUndefined();
            expect(httpResponseMessage).not.toBeNull();
            expect(httpResponseMessage).not.toBeUndefined();
            done();
        }});

    });
});
