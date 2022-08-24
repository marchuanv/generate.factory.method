const utils = require('utils');
fdescribe("when asking a client messagebus to publish a request", function() {
  
  const scopeId = "clientmessagebustest";
  const timeout = 15000;
  const senderHost = 'localhost';
  const senderPort = 3000;
  const recipientHost = 'localhost';
  const recipientPort = 3000;

  beforeAll(() => {
    const userId = 'clientmessagebus';
    const secret = 'clientmessagebus1234';
    const { createUserSessions } = require('../../lib/factory/usersessions.factory.js');
    const { userSessions } = createUserSessions({ scopeId });
    const { userSecurity } = userSessions.ensureSession({ userId });
    userSecurity.register({ secret });
    ({ token } = userSecurity.authenticate({ secret }));
    const { createHttpServerMessageBus } = require('../../lib/factory/httpservermessagebus.factory.js');
    const { createHttpServerMessageBusManager } = require('../../lib/factory/httpservermessagebusmanager.factory.js');
    createHttpServerMessageBus({ scopeId, timeout, senderHost, senderPort });
    const { createHttpClientMessageBus } = require('../../lib/factory/httpclientmessagebus.factory.js');
    createHttpClientMessageBus({ scopeId, timeout });
    createHttpServerMessageBusManager({ scopeId });
  });

  it("it should receive a response message", (done) => {
    
    // Arrange
    const path = '/clientmessagebustest';
    
    const metadata = { path };
    let expectedDecryptedClientText = 'Hello From Client';
    let expectedDecryptedServerText = 'Hello From Server';
    let requestMessage = null;
    const { createMessage } = require('../../lib/factory/message.factory');

    { 
      //Simulate a Server
      const { createServerMessageBus } = require('../../lib/factory/servermessagebus.factory.js');
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

    const { createClientMessageBus } = require('../../lib/factory/clientmessagebus.factory.js');
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
