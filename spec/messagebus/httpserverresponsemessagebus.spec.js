const utils = require('utils');
describe("when an http server response messagebus publishes and http response message", function() {

    let token = null;
    const scopeId = "httpserverresponsemessagebustest";
    const senderHost = 'localhost';
    const senderPort = 3000;
    const timeout = 15000;

    beforeAll(() => {
        const userId = 'httpervermessagebus';
        const secret = 'httpervermessagebus1234';
        const { createUserSessions } = require('../../lib/factory/usersessions.factory.js');
        const { userSessions } = createUserSessions({ scopeId });
        const { userSecurity } = userSessions.ensureSession({ userId });
        userSecurity.register({ secret });
        ({ token } = userSecurity.authenticate({ secret }));

        const { createHttpServerMessageBus } = require('../../lib/factory/httpservermessagebus.factory.js');
        const { createHttpClientMessageBus } = require('../../lib/factory/httpclientmessagebus.factory.js');
        const { createHttpServerMessageBusManager } = require('../../lib/factory/httpservermessagebusmanager.factory.js');
        const { createHttpClientMessageBusManager } = require('../../lib/factory/httpclientmessagebusmanager.factory.js');
    
        createHttpServerMessageBus({ scopeId, timeout, senderHost, senderPort });
        createHttpClientMessageBus({ scopeId, timeout });
        createHttpServerMessageBusManager({ scopeId });
        createHttpClientMessageBusManager({ scopeId });
    });

    it("it should send an http response message", (done) => {
        
        // Arrange
        const { createHttpRequestMessage } = require('../../lib/factory/httprequestmessage.factory.js');
        const { createHttpResponseMessage } = require('../../lib/factory/httpresponsemessage.factory.js');

        const { createHttpClientRequestMessageBus } = require('../../lib/factory/httpclientrequestmessagebus.factory.js');
        const { createHttpClientResponseMessageBus } = require('../../lib/factory/httpclientresponsemessagebus.factory.js');
        const { createHttpServerResponseMessageBus } = require('../../lib/factory/httpserverresponsemessagebus.factory.js');

        const { httpClientRequestMessageBus } = createHttpClientRequestMessageBus({ scopeId });
        const { httpClientResponseMessageBus } = createHttpClientResponseMessageBus({ scopeId });
        const { httpServerResponseMessageBus } = createHttpServerResponseMessageBus({ scopeId });

        httpClientRequestMessageBus.publish(createHttpRequestMessage({
            scopeId: utils.generateGUID(),
            messageStatusCode: 2, //pending
            Id: null,
            data: 'Hello From Client',
            recipientHost,
            recipientPort,
            metadata: { path: `/${scopeId}` },
            token,
            senderHost,
            senderPort
        }));

        // Act
        httpServerResponseMessageBus.publish(createHttpResponseMessage({
            scopeId: utils.generateGUID(),
            messageStatusCode: 0, //success
            Id: null,
            data: 'Hello From Server',
            recipientHost,
            recipientPort,
            metadata: { path: `/${scopeId}` },
            token,
            senderHost,
            senderPort
        }));
    
        // Assert
        httpClientRequestMessageBus.subscribe({ callback: ({ httpResponseMessage }) => {
            expect(httpResponseMessage).not.toBeNull();
            expect(httpResponseMessage).not.toBeUndefined();
            setTimeout(done, 1500);
        }});

    });
});
