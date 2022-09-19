const utils = require('utils');
describe("when asking the server messagebus to subscribe to request messages and publish a response", () => {

  let token = null;
  const factoryContainerBindingName = 'servermessagebustest';
  const timeout = 15000;
  const senderHost = 'localhost';
  const senderPort = 3000;

  const { createHttpServerMessageBus } = require('../../lib/factory/httpservermessagebus.factory.js');
  const { createHttpServerMessageBusManager } = require('../../lib/factory/httpservermessagebusmanager.factory.js');
  const { createHttpClientMessageBus } = require('../../lib/factory/httpclientmessagebus.factory.js');
  const { createHttpClientMessageBusManager } = require('../../lib/factory/httpclientmessagebusmanager.factory.js');
  const { createMessage } = require('../../lib/factory/message.factory');
  const { createClientMessageBus } = require('../../lib/factory/clientmessagebus.factory.js');
  const { createServerMessageBus } = require('../../lib/factory/servermessagebus.factory.js');

  beforeAll(() => {
    const userId = factoryContainerBindingName;
    const secret = `${factoryContainerBindingName}1234`;
    const { createUserSessions } = require('../../lib/factory/usersessions.factory.js');
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
      factoryContainerBindingName: utils.generateGUID(),
      messageStatusCode: 2, Id: null, data: expectedDecryptedClientText,
      recipientHost, recipientPort, metadata, token, senderHost, senderPort 
    }));
    const { serverMessageBus } = createServerMessageBus({ factoryContainerBindingName, timeout, senderHost, senderPort });

    // Act
    serverMessageBus.subscribe({ callback: ({ message }) => {
      requestMessage = message;
      serverMessageBus.publish(createMessage({ 
        factoryContainerBindingName: utils.generateGUID(),
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
        const { senderHost, senderPort } = requestMessage.getSenderAddress();
        expect(senderHost).toEqual('localhost');
        expect(senderPort).toEqual(3000);
      }
      setTimeout(done, 1500);
    }});
  });
});
