const utils = require('utils');
describe("when an http client request messagebus publishes an http request message", function() {
    
    let token = null;
    const contextName = "HttpClientRequestMessageBusSpec";
    const timeout = 15000;
    const senderHost = 'localhost';
    const senderPort = 3000;
    const recipientHost = 'localhost';
    const recipientPort = 3000;

    let createHttpRequestMessage = null;
    let createHttpResponseMessage = null;
    let createUserSessions = null;
    let createHttpClientRequestMessageBus = null;
    let createHttpClientResponseMessageBus = null;
    let createHttpServerResponseMessageBus = null;
    let createHttpServerMessageBus = null;
    let createHttpClientMessageBus = null;
    let createHttpServerMessageBusManager = null;
    let createHttpClientMessageBusManager = null;

    beforeAll(() => {

        ( { createHttpRequestMessage } = require('../../lib/factory/generated/httprequestmessage/httprequestmessage.factory.js'));
        ( { createHttpResponseMessage } = require('../../lib/factory/generated/httpresponsemessage/httpresponsemessage.factory.js'));
        ( { createUserSessions } = require('../../lib/factory/generated/usersessions/usersessions.factory.js'));
        ( { createHttpClientRequestMessageBus } = require('../../lib/factory/generated/httpclientrequestmessagebus/httpclientrequestmessagebus.factory.js'));
        ( { createHttpClientResponseMessageBus } = require('../../lib/factory/generated/httpclientresponsemessagebus/httpclientresponsemessagebus.factory.js'));
        ( { createHttpServerResponseMessageBus } = require('../../lib/factory/generated/httpserverresponsemessagebus/httpserverresponsemessagebus.factory.js'));
        ( { createHttpServerMessageBus } = require('../../lib/factory/generated/httpservermessagebus/httpservermessagebus.factory.js'));
        ( { createHttpClientMessageBus } = require('../../lib/factory/generated/httpclientmessagebus/httpclientmessagebus.factory.js'));
        ( { createHttpServerMessageBusManager } = require('../../lib/factory/generated/httpservermessagebusmanager/httpservermessagebusmanager.factory.js'));
        ( { createHttpClientMessageBusManager } = require('../../lib/factory/generated/httpclientmessagebusmanager/httpclientmessagebusmanager.factory.js'));

        const userId = contextName;
        const secret = `${contextName}1234`;
        const { userSessions } = createUserSessions({ contextName });
        const { userSecurity } = userSessions.ensureSession({ userId });
        userSecurity.register({ secret });
        ({ token } = userSecurity.authenticate({ secret }));
        createHttpServerMessageBus({ contextName, timeout, senderHost, senderPort });
        createHttpClientMessageBus({ contextName, timeout });
        createHttpServerMessageBusManager({ contextName });
        createHttpClientMessageBusManager({ contextName });
    });

    it("the http client response messagebus should receive an http response message", (done) => {
        
        // Arrange
        const metadata = { path: `/${contextName}` };
        const expectedDecryptedClientText = `${contextName}: Hello From Client`;
        const expectedDecryptedServerText = `${contextName}: Hello From Server`;
        const { clientRequestMessageBus } = createHttpClientRequestMessageBus({ contextName });
        const { clientResponseMessageBus } = createHttpClientResponseMessageBus({ contextName });
        const { serverResponseMessageBus } = createHttpServerResponseMessageBus({ contextName });

        serverResponseMessageBus.publish(createHttpResponseMessage({
            contextName,
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
        clientRequestMessageBus.publish(createHttpRequestMessage({
            contextName,
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
        clientResponseMessageBus.subscribe({ callback: ({ httpResponseMessage }) => {
            expect(httpResponseMessage).not.toBeNull();
            expect(httpResponseMessage).not.toBeUndefined();
            const { text } = httpResponseMessage.getDecryptedContent();
            expect(text).toEqual(expectedDecryptedServerText);
            setTimeout(done, 1500);
        }});

    });
});
