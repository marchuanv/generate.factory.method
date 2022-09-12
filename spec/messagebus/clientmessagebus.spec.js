const utils = require('utils');
fdescribe("when asking a client messagebus to publish a request", function() {
  
  const scopeId = "clientmessagebustest";
  const timeout = 15000;
  const senderHost = 'localhost';
  const senderPort = 3000;
  const recipientHost = 'localhost';
  const recipientPort = 3000;

  const { createMessage } = require('../../lib/factory/message.factory');
  const { createUserSessions } = require('../../lib/factory/usersessions.factory.js');
  const { createServerMessageBus } = require('../../lib/factory/servermessagebus.factory.js');
  const { createHttpServerMessageBus } = require('../../lib/factory/httpservermessagebus.factory.js');
  const { createHttpClientMessageBus } = require('../../lib/factory/httpclientmessagebus.factory.js');
  const { createHttpServerMessageBusManager } = require('../../lib/factory/httpservermessagebusmanager.factory.js');
  const { createHttpClientMessageBusManager } = require('../../lib/factory/httpclientmessagebusmanager.factory.js');
  const { createClientMessageBus } = require('../../lib/factory/clientmessagebus.factory.js');

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

  it("it should receive a response message", (done) => {
    
    // Arrange
    const metadata = { path:  `/${scopeId}` };
    const expectedDecryptedClientText = `${scopeId}: Hello From Client`;
    const expectedDecryptedServerText = `${scopeId}: Hello From Server`;
    let requestMessage = null;

    { 
      //Simulate a Server
      const { serverMessageBus } = createServerMessageBus({ scopeId, timeout, senderHost, senderPort });
      serverMessageBus.publish(createMessage({ 
        scopeId: utils.generateGUID(),
        messageStatusCode: 0, Id: null, data: expectedDecryptedServerText, 
        recipientHost, recipientPort, metadata, token, senderHost, senderPort 
      }));
      serverMessageBus.subscribe({ callback: ({ message }) => {
        requestMessage = message;
      }});
    }

    const { clientMessageBus } = createClientMessageBus({ scopeId, timeout, senderHost, senderPort });

    // Act
    clientMessageBus.publish(createMessage({ 
      scopeId: utils.generateGUID(),
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
        const { senderHost, senderPort } = requestMessage.getSenderAddress();
        expect(senderHost).toEqual('localhost');
        expect(senderPort).toEqual(3000);
      }
      setTimeout(done, 1500);
    }});
  });
});
