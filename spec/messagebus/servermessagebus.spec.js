describe("when asking the server messagebus to subscribe to request messages and publish a response", () => {

  let token = null;
  const factoryContainerBindingName = 'ServerMessageBusSpec';
  const timeout = 15000;
  const senderHost = 'localhost';
  const senderPort = 3000;

  let createHttpServerMessageBus = null;
  let  createHttpServerMessageBusManager = null;
  let  createHttpClientMessageBus = null;
  let  createHttpClientMessageBusManager = null;
  let  createMessage = null;
  let  createClientMessageBus = null;
  let  createServerMessageBus = null;

  beforeAll(() => {
    ({ createHttpServerMessageBus } = require('../../lib/factory/generated/httpservermessagebus/httpservermessagebus.factory.js'));
    ({ createHttpServerMessageBusManager } = require('../../lib/factory/generated/httpservermessagebusmanager/httpservermessagebusmanager.factory.js'));
    ({ createHttpClientMessageBus } = require('../../lib/factory/generated/httpclientmessagebus/httpclientmessagebus.factory.js'));
    ({ createHttpClientMessageBusManager } = require('../../lib/factory/generated/httpclientmessagebusmanager/httpclientmessagebusmanager.factory.js'));
    ({ createMessage } = require('../../lib/factory/generated/message/message.factory'));
    ({ createClientMessageBus } = require('../../lib/factory/generated/clientmessagebus/clientmessagebus.factory.js'));
    ({ createServerMessageBus } = require('../../lib/factory/generated/servermessagebus/servermessagebus.factory.js'));

    const userId = factoryContainerBindingName;
    const secret = `${factoryContainerBindingName}1234`;
    const { createUserSessions } = require('../../lib/factory/generated/usersessions/usersessions.factory.js');
    const { userSessions } = createUserSessions({ factoryContainerBindingName });
    const { userSecurity } = userSessions.ensureSession({ userId });
    userSecurity.register({ secret });
    ({ token } = userSecurity.authenticate({ secret }));
    createHttpServerMessageBus({ factoryContainerBindingName, timeout, senderHost, senderPort });
    createHttpClientMessageBus({ factoryContainerBindingName, timeout });
    createHttpServerMessageBusManager({ factoryContainerBindingName });
    createHttpClientMessageBusManager({ factoryContainerBindingName });
  });

  it("it should succeed without any errors", (done) => {
    
    // Arrange
    const recipientHost = 'localhost';
    const recipientPort = 3000;
    const metadata = { path:  `/${factoryContainerBindingName}` };
    const expectedDecryptedClientText = `${factoryContainerBindingName}: Hello From Client`;
    const expectedDecryptedServerText = `${factoryContainerBindingName}: Hello From Server`;
    let requestMessage = null;

    const { clientMessageBus } = createClientMessageBus({ factoryContainerBindingName, timeout, senderHost, senderPort });
    clientMessageBus.publish(createMessage({ 
      factoryContainerBindingName,
      messageStatusCode: 2, Id: null, data: expectedDecryptedClientText,
      recipientHost, recipientPort, metadata, token, senderHost, senderPort 
    }));
    const { serverMessageBus } = createServerMessageBus({ factoryContainerBindingName, timeout, senderHost, senderPort });

    // Act
    serverMessageBus.subscribe({ callback: ({ message }) => {
      requestMessage = message;
      serverMessageBus.publish(createMessage({ 
        factoryContainerBindingName,
        messageStatusCode: 0, Id: null, data: expectedDecryptedServerText,
        recipientHost, recipientPort, metadata, token, senderHost, senderPort 
      }));
    }})

    // Assert
    clientMessageBus.subscribe({ callback: ({ message }) => {
      const responseMessage = message;
      expect(responseMessage).not.toBeUndefined();
      expect(responseMessage).not.toBeNull();
      {
        const { text } = responseMessage.getDecryptedContent();
        expect(text).toEqual(expectedDecryptedServerText);
      }
      {
        const { code } = responseMessage.getMessageStatus();
        expect(code).toEqual(0); //success
      }
      expect(requestMessage).not.toBeUndefined();
      expect(requestMessage).not.toBeNull();
      {
        const { code } = requestMessage.getMessageStatus();
        expect(code).toEqual(2); //pending
      }
      {
        const { text } = requestMessage.getDecryptedContent();
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
