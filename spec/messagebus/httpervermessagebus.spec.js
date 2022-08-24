const utils = require('utils');
describe("when an http server messagebus receives an http request message", function() {

    let token = null;
    const scopeId = "httpservermessagebustest";
    const senderHost = 'localhost';
    const senderPort = 3000;
    const timeout = 15000;

    beforeAll(() => {
        const userId = 'httpervermessagebus';
        const secret = 'httpervermessagebus1234';
        const { createUserSessions } = require('../../lib/factory/usersessions.factory.js');
        const { createHttpServerMessageBusManager } = require('../../lib/factory/httpservermessagebusmanager.factory.js');
        const { createHttpClientMessageBusManager } = require('../../lib/factory/httpclientmessagebusmanager.factory.js');
        const { userSessions } = createUserSessions({ scopeId });
        const { userSecurity } = userSessions.ensureSession({ userId });
        userSecurity.register({ secret });
        ({ token } = userSecurity.authenticate({ secret }));
        createHttpServerMessageBusManager({ scopeId });
        createHttpClientMessageBusManager({ scopeId });
    });

    it("it should send an http response message", (done) => {
        
        // Arrange
        const { createHttpClientMessageBus } = require('../../lib/factory/httpclientmessagebus.factory.js');
        const { createHttpServerMessageBus } = require('../../lib/factory/httpservermessagebus.factory.js');
        const { createHttpRequestMessage } = require('../../lib/factory/httprequestmessage.factory.js');
        const { createHttpResponseMessage } = require('../../lib/factory/httpresponsemessage.factory.js');
        const { httpClientMessageBus } = createHttpClientMessageBus({ scopeId, timeout, senderHost, senderPort });
        const { httpServerMessageBus } = createHttpServerMessageBus({ scopeId, timeout, senderHost, senderPort });

        httpClientMessageBus.publishHttpRequestMessage(createHttpRequestMessage({
            scopeId: utils.generateGUID(),
            messageStatusCode: 2, //pending
            Id: null,
            data: 'Hello From Client',
            recipientHost: 'localhost',
            recipientPort: 3000,
            metadata: { path: '/httpclientmessagebustest' },
            token,
            senderHost,
            senderPort
        }));

        // Act
        httpServerMessageBus.subscribeToHttpRequestMessages({ callback: () => {
            httpServerMessageBus.publishHttpResponseMessage(createHttpResponseMessage({
                scopeId: utils.generateGUID(),
                messageStatusCode: 0, //success
                Id: null,
                data: 'Hello From Server',
                recipientHost: 'localhost',
                recipientPort: 3000,
                metadata: { path: '/httpservermessagebustest' },
                token,
                senderHost,
                senderPort
            }));
        }});
    
        // Assert
        httpClientMessageBus.subscribeToHttpResponseMessages({ callback: ({ httpResponseMessage }) => {
            expect(httpResponseMessage).not.toBeNull();
            expect(httpResponseMessage).not.toBeUndefined();
            setTimeout(done, 1500);
        }});

    });
});
