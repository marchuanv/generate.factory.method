fdescribe("when asking the client message bus publish and subscribe to messages", function() {

  let token = null;

  beforeAll(() => {
    const userId = 'messagebus';
    const secret = 'messagebus1234';
    const { createSharedUserSessions } = require('../../lib/factory/sharedusersessions.factory.js');
    const { sharedUserSessions } = createSharedUserSessions({});
    const { userSecurity } = sharedUserSessions.ensureSession({ userId });
    userSecurity.register({ secret });
    ({ token } = userSecurity.authenticate({ secret }));
  });

  it("it should succeed without any errors", (done) => {
    
    // Arrange
    const path = '/messagebustest';
    const senderHost = 'localhost';
    const senderPort = 3000;
    const recipientHost = 'localhost';
    const recipientPort = 3000;
    const timeout = 15000;
    const contextId = 'messagebustests';
    const metadata = {};
    let expectedDecryptedClientText = 'Hello From Client';
    let expectedDecryptedServerText = 'Hello From Server';
    let requestMessage = null;
    const { createMessage } = require('../../lib/factory/message.factory');

    { 
      //Simulate a Server
      const { createServerMessageBus } = require('../../lib/factory/servermessagebus.factory.js');
      const { serverMessageBus } = createServerMessageBus({ timeout, contextId, senderHost, senderPort });
      serverMessageBus.initialise();
      const { message } = createMessage({ messageStatusCode: 0, Id: null, data: expectedDecryptedServerText, recipientHost, recipientPort, metadata, token, senderHost, senderPort });
      serverMessageBus.publishMessage({ message });
      serverMessageBus.subscribeToMessages({ callback: ({ message }) => {
        requestMessage = message;
      }});
    }

    const { createClientMessageBus } = require('../../lib/factory/clientmessagebus.factory.js');
    const { clientMessageBus } = createClientMessageBus({ timeout, contextId, senderHost, senderPort });

    // Act
    clientMessageBus.publishMessage(createMessage({ 
      messageStatusCode: 2, Id: null, data: expectedDecryptedClientText,
      recipientHost, recipientPort, metadata: { path }, token, senderHost, senderPort 
    }));

    // Assert
    clientMessageBus.subscribeToMessages({ callback: ({ message }) => {
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

      done();
    }});
  });
});
