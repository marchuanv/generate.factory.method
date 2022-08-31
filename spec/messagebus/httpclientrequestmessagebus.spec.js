const utils = require('utils');
describe("when an http client request messagebus publishes an http request message", function() {
    
    let token = null;
    const scopeId = "httpclientrequestmessagebustest";
    const timeout = 15000;
    const senderHost = 'localhost';
    const senderPort = 3000;
    const recipientHost = 'localhost';
    const recipientPort = 3000;

    const { createHttpRequestMessage } = require('../../lib/factory/httprequestmessage.factory.js');
    const { createHttpResponseMessage } = require('../../lib/factory/httpresponsemessage.factory.js');
    const { createUserSessions } = require('../../lib/factory/usersessions.factory.js');
    const { createHttpClientRequestMessageBus } = require('../../lib/factory/httpclientrequestmessagebus.factory.js');
    const { createHttpClientResponseMessageBus } = require('../../lib/factory/httpclientresponsemessagebus.factory.js');
    const { createHttpServerResponseMessageBus } = require('../../lib/factory/httpserverresponsemessagebus.factory.js');
    const { createHttpServerMessageBus } = require('../../lib/factory/httpservermessagebus.factory.js');
    const { createHttpClientMessageBus } = require('../../lib/factory/httpclientmessagebus.factory.js');
    const { createHttpServerMessageBusManager } = require('../../lib/factory/httpservermessagebusmanager.factory.js');
    const { createHttpClientMessageBusManager } = require('../../lib/factory/httpclientmessagebusmanager.factory.js');

    beforeAll(() => {
        const userId = scopeId;
        const secret = `${scopeId}1234`;
        const { userSessions } = createUserSessions({ scopeId });
        const { userSecurity } = userSessions.ensureSession({ userId });
        userSecurity.register({ secret });
        ({ token } = userSecurity.authenticate({ secret }));
        createHttpServerMessageBus({ scopeId, timeout, senderHost, senderPort });
        createHttpClientMessageBus({ scopeId, timeout });
        createHttpServerMessageBusManager({ scopeId });
        createHttpClientMessageBusManager({ scopeId });
    });

    it("the http client response messagebus should receive an http response message", (done) => {
        
        // Arrange
        const metadata = { path: `/${scopeId}` };
        const expectedDecryptedClientText = `${scopeId}: Hello From Client`;
        const expectedDecryptedServerText = `${scopeId}: Hello From Server`;
        const { httpClientRequestMessageBus } = createHttpClientRequestMessageBus({ scopeId });
        const { httpClientResponseMessageBus } = createHttpClientResponseMessageBus({ scopeId });
        const { httpServerResponseMessageBus } = createHttpServerResponseMessageBus({ scopeId });

        httpServerResponseMessageBus.publish(createHttpResponseMessage({
            scopeId: utils.generateGUID(),
            messageStatusCode: 0, //success
            Id: null,
            data: expectedDecryptedServerText,
            recipientHost,
            recipientPort,
            metadata,
            token,
            senderHost,
            senderPort
        }));

        // Act
        httpClientRequestMessageBus.publish(createHttpRequestMessage({
            scopeId: utils.generateGUID(),
            messageStatusCode: 2, //pending
            Id: null,
            data: expectedDecryptedClientText,
            recipientHost,
            recipientPort,
            metadata,
            token,
            senderHost,
            senderPort
        }));

        // Assert
        httpClientResponseMessageBus.subscribe({ callback: ({ httpResponseMessage }) => {
            expect(httpResponseMessage).not.toBeNull();
            expect(httpResponseMessage).not.toBeUndefined();
            const { text } = httpResponseMessage.getDecryptedContent();
            expect(text).toEqual(expectedDecryptedServerText);
            setTimeout(done, 1500);
        }});

    });
});
