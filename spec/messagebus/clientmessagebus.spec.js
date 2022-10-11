fdescribe("when asking a client messagebus to publish a request", function() {
  
  const factoryContainerBindingName = "ClientMessageBusSpec";
  const timeout = 15000;
  const senderHost = 'localhost';
  const senderPort = 3000;
  const recipientHost = 'localhost';
  const recipientPort = 3000;

  let createMessage = null;
  let createUserSessions = null;
  let createServerMessageBus = null;
  let createHttpServerMessageBus = null;
  let createHttpClientMessageBus = null;
  let createHttpServerMessageBusManager = null;
  let createHttpClientMessageBusManager = null;
  let createClientMessageBus = null;

  beforeAll(() => {

    ({ createMessage } = require('../../lib/factory/generated/message/message.factory'));
    ({ createUserSessions } = require('../../lib/factory/generated/usersessions/usersessions.factory.js'));
    ({ createServerMessageBus } = require('../../lib/factory/generated/servermessagebus/servermessagebus.factory.js'));
    ({ createHttpServerMessageBus } = require('../../lib/factory/generated/httpservermessagebus/httpservermessagebus.factory.js'));
    ({ createHttpClientMessageBus } = require('../../lib/factory/generated/httpclientmessagebus/httpclientmessagebus.factory.js'));
    ({ createHttpServerMessageBusManager } = require('../../lib/factory/generated/httpservermessagebusmanager/httpservermessagebusmanager.factory.js'));
    ({ createHttpClientMessageBusManager } = require('../../lib/factory/generated/httpclientmessagebusmanager/httpclientmessagebusmanager.factory.js'));
    ({ createClientMessageBus } = require('../../lib/factory/generated/clientmessagebus/clientmessagebus.factory.js'));

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

  it("it should receive a response message", (done) => {
    
    // Arrange
    const metadata = { path:  `/${factoryContainerBindingName}` };
    const expectedDecryptedClientText = `${factoryContainerBindingName}: Hello From Client`;
    const expectedDecryptedServerText = `${factoryContainerBindingName}: Hello From Server`;
    let requestMessage = null;

    { 
      //Simulate a Server
      const { serverMessageBus } = createServerMessageBus({ factoryContainerBindingName, timeout, senderHost, senderPort });
      serverMessageBus.publish(createMessage({ 
        factoryContainerBindingName: null,
        messageStatusCode: 0, Id: null, data: expectedDecryptedServerText, 
        recipientHost, recipientPort, metadata, token, senderHost, senderPort 
      }));
      serverMessageBus.subscribe({ callback: ({ message }) => {
        requestMessage = message;
      }});
    }

    const { clientMessageBus } = createClientMessageBus({ factoryContainerBindingName, timeout, senderHost, senderPort });

    // Act
    clientMessageBus.publish(createMessage({ 
      factoryContainerBindingName: null,
      messageStatusCode: 2, Id: null, data: expectedDecryptedClientText,
      recipientHost, recipientPort, metadata, token, senderHost, senderPort 
    }));

    // Assert
    clientMessageBus.subscribe({ callback: ({ message }) => {
      const responseMessage = message;
      expect(responseMessage).not.toBeUndefined();
      expect(responseMessage).not.toBeNull();
      {
        const { text } = responseMessage.getDecryptedContent();
        const { code } = responseMessage.getMessageStatus();
        expect(text).toEqual(expectedDecryptedServerText);
        expect(code).toEqual(0); //success
      }
      expect(requestMessage).not.toBeUndefined();
      expect(requestMessage).not.toBeNull();
      {
        const { code } = requestMessage.getMessageStatus();
        const { text } = requestMessage.getDecryptedContent();
        expect(code).toEqual(2); //pending
        expect(text).toEqual(expectedDecryptedClientText);
      }
      {
        const { senderAddress } = message.getSenderAddress();
        const { senderHost, senderPort } = senderAddress;
        expect(senderHost).toEqual('localhost');
        expect(senderPort).toEqual(3000);
      }
      setTimeout(done, 1500);
    }});
  });
});
