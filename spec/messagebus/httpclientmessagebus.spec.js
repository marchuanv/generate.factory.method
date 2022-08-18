const utils = require('utils');

describe("when an http client messagebus sends an http request message", function() {
    let token = null;
    const  scopeId = "httpclientmessagebustest";

    beforeAll(() => {
        const userId = 'httpclientmessagebus';
        const secret = 'httpclientmessagebus1234';
        const { createUserSessions } = require('../../lib/factory/usersessions.factory.js');
        const { userSessions } = createUserSessions({ scopeId });
        const { userSecurity } = userSessions.ensureSession({ userId });
        userSecurity.register({ secret });
        ({ token } = userSecurity.authenticate({ secret }));
    });

    it("it should receive an http response message", (done) => {
        
        // Arrange
        const { createHttpClientMessageBus } = require('../../lib/factory/httpclientmessagebus.factory.js');
        const { createHttpServerMessageBus } = require('../../lib/factory/httpservermessagebus.factory.js');
        const { createHttpRequestMessage } = require('../../lib/factory/httprequestmessage.factory.js');
        const { createHttpResponseMessage } = require('../../lib/factory/httpresponsemessage.factory.js');
        const { httpClientMessageBus } = createHttpClientMessageBus({ scopeId, timeout: 15000, senderHost: 'localhost', senderPort: 3000 });
        const { httpServerMessageBus } = createHttpServerMessageBus({ scopeId, timeout: 15000, senderHost: 'localhost', senderPort: 3000 });

        httpServerMessageBus.publishHttpResponseMessage(createHttpResponseMessage({
            scopeId: utils.generateGUID(),
            messageStatusCode: 0, //success
            Id: null,
            data: 'Hello From Server',
            recipientHost: 'localhost',
            recipientPort: 3000,
            metadata: { path: '/httpclientmessagebustest' },
            token,
            senderHost: 'localhost',
            senderPort: 3000
        }));

        // Act
        httpClientMessageBus.publishHttpRequestMessage(createHttpRequestMessage({
            scopeId: utils.generateGUID(),
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
        httpClientMessageBus.subscribeToHttpResponseMessages({ callback: ({ httpResponseMessage }) => {
            expect(httpResponseMessage).not.toBeNull();
            expect(httpResponseMessage).not.toBeUndefined();
            setTimeout(done, 1500);
        }});

    });
});
