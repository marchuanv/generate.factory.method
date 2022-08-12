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
    let expectedDecryptedServerText;
    let expectedDecryptedClientText;

    const { createMessage } = require('../../lib/factory/message.factory');
    const { createClientMessageBus } = require('../../lib/factory/clientmessagebus.factory.js');
    const { createHttpServerMessageBus } = require('../../lib/factory/httpservermessagebus.factory.js');
    const { clientMessageBus } = createClientMessageBus({ timeout, contextId, senderHost, senderPort });
    const { httpServerMessageBus } = createHttpServerMessageBus({ timeout, contextId, senderHost, senderPort });
    const assertCallback = null;

    clientMessageBus.subscribeToMessages({ callback: ({ message }) => {
      assertCallback({ responseMessage: message });
    }});
   
    // Act
    httpServerMessageBus.initialise();
    const { message } = createMessage({ messageStatusCode: 2, Id: null, data: 'Hello From Client', recipientHost, recipientPort, metadata: { path }, token, senderHost, senderPort });
    {
      const { text } = message.getDecryptedContent();
      expectedDecryptedClientText = text;
    }
    messageBus.publishMessage({ message });
    
    // Assert
    assertCallback = ({ responseMessage }) => {
      expect(messageBus.isOpen()).toBeFalsy();
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
      done();
    }
  
  });
});
