const utils = require('utils');
describe("when an http client request messagebus publishes an http request message", function() {
    
    let token = null;
    const factoryContainerBindingName = "httpclientrequestmessagebustest";
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

        ( { createHttpRequestMessage } = require('../../lib/factory/httprequestmessage.factory.js'));
        ( { createHttpResponseMessage } = require('../../lib/factory/httpresponsemessage.factory.js'));
        ( { createUserSessions } = require('../../lib/factory/usersessions.factory.js'));
        ( { createHttpClientRequestMessageBus } = require('../../lib/factory/httpclientrequestmessagebus.factory.js'));
        ( { createHttpClientResponseMessageBus } = require('../../lib/factory/httpclientresponsemessagebus.factory.js'));
        ( { createHttpServerResponseMessageBus } = require('../../lib/factory/httpserverresponsemessagebus.factory.js'));
        ( { createHttpServerMessageBus } = require('../../lib/factory/httpservermessagebus.factory.js'));
        ( { createHttpClientMessageBus } = require('../../lib/factory/httpclientmessagebus.factory.js'));
        ( { createHttpServerMessageBusManager } = require('../../lib/factory/httpservermessagebusmanager.factory.js'));
        ( { createHttpClientMessageBusManager } = require('../../lib/factory/httpclientmessagebusmanager.factory.js'));

        const userId = factoryContainerBindingName;
        const secret = `${factoryContainerBindingName}1234`;
        const { userSessions } = createUserSessions({ factoryContainerBindingName });
        const { userSecurity } = userSessions.ensureSession({ userId });
        userSecurity.register({ secret });
        ({ token } = userSecurity.authenticate({ secret }));
        createHttpServerMessageBus({ factoryContainerBindingName, timeout, senderHost, senderPort });
        createHttpClientMessageBus({ factoryContainerBindingName, timeout });
        createHttpServerMessageBusManager({ factoryContainerBindingName });
        createHttpClientMessageBusManager({ factoryContainerBindingName });
    });

    it("the http client response messagebus should receive an http response message", (done) => {
        
        // Arrange
        const metadata = { path: `/${factoryContainerBindingName}` };
        const expectedDecryptedClientText = `${factoryContainerBindingName}: Hello From Client`;
        const expectedDecryptedServerText = `${factoryContainerBindingName}: Hello From Server`;
        const { httpClientRequestMessageBus } = createHttpClientRequestMessageBus({ factoryContainerBindingName });
        const { httpClientResponseMessageBus } = createHttpClientResponseMessageBus({ factoryContainerBindingName });
        const { httpServerResponseMessageBus } = createHttpServerResponseMessageBus({ factoryContainerBindingName });

        httpServerResponseMessageBus.publish(createHttpResponseMessage({
            factoryContainerBindingName: null,
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
            factoryContainerBindingName: null,
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
