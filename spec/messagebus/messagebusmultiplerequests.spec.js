const utils = require('utils');
describe("when asking a client messagebus to publish multiple requests", function() {

  let token = null;
  const scopeId  = 'messagebusmultiplerequests';
  const timeout = 15000;
  const senderHost = 'localhost';
  const senderPort = 3000;
  
  beforeAll(() => {
    const userId = 'clientmessagebus';
    const secret = 'clientmessagebus1234';
    const { createUserSessions } = require('../../lib/factory/usersessions.factory.js');
    const { userSessions } = createUserSessions({ scopeId });
    const { userSecurity } = userSessions.ensureSession({ userId });
    userSecurity.register({ secret });
    ({ token } = userSecurity.authenticate({ secret }));
    const { createHttpServerMessageBus } = require('../../lib/factory/httpservermessagebus.factory.js');
    createHttpServerMessageBus({ scopeId, timeout, senderHost, senderPort });
  });

  it("it should handle the responses for each request", (done) => {
    
    // Arrange
    const path = '/messagebusmultiplerequests';
    const recipientHost = 'localhost';
    const recipientPort = 3000;
    const metadata = { path };
    let expectedDecryptedClientText1 = 'Hello From Client First';
    let expectedDecryptedClientText2 = 'Hello From Client Second';
    let expectedDecryptedServerText1 = 'Hello From Server First';
    let expectedDecryptedServerText2 = 'Hello From Server Second';
    let requestMessage1 = null;
    let requestMessage2 = null;
    const { createMessage } = require('../../lib/factory/message.factory');

    { 
      //Simulate a Server
      const { createServerMessageBus } = require('../../lib/factory/servermessagebus.factory.js');
      const { serverMessageBus } = createServerMessageBus({ scopeId, timeout, senderHost, senderPort });
      serverMessageBus.subscribeToMessages({ callback: ({ message }) => {
        requestMessage1 = message;
      }});
      serverMessageBus.subscribeToMessages({ callback: ({ message }) => {
        requestMessage2 = message;
      }});
      serverMessageBus.publishMessage(createMessage({ 
        scopeId: utils.generateGUID(),
        messageStatusCode: 0, Id: null, data: expectedDecryptedServerText1, 
        recipientHost, recipientPort, metadata, token, senderHost, senderPort 
      }));
      serverMessageBus.publishMessage(createMessage({ 
        scopeId: utils.generateGUID(),
        messageStatusCode: 0, Id: null, data: expectedDecryptedServerText2, 
        recipientHost, recipientPort, metadata, token, senderHost, senderPort 
      }));
    }

    const { createClientMessageBus } = require('../../lib/factory/clientmessagebus.factory.js');
    const { clientMessageBus } = createClientMessageBus({ scopeId, timeout, senderHost, senderPort });

    // Act
    clientMessageBus.publishMessage(createMessage({ 
      scopeId: utils.generateGUID(),
      messageStatusCode: 2, Id: null, data: expectedDecryptedClientText1,
      recipientHost, recipientPort, metadata, token, senderHost, senderPort 
    }));
    clientMessageBus.publishMessage(createMessage({ 
      scopeId: utils.generateGUID(),
      messageStatusCode: 2, Id: null, data: expectedDecryptedClientText2,
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
        expect(text).toEqual(expectedDecryptedServerText1);
        expect(code).toEqual(0); //success
      }
      expect(requestMessage1).not.toBeUndefined();
      expect(requestMessage1).not.toBeNull();
      {
        const { code } = requestMessage1.getMessageStatus();
        const { text } = requestMessage1.getDecryptedContent();
        expect(code).toEqual(2); //pending
        expect(text).toEqual(expectedDecryptedClientText1);
      }
      {
        const { senderHost, senderPort } = requestMessage1.getSenderAddress();
        expect(senderHost).toEqual('localhost');
        expect(senderPort).toEqual(3000);
      }
    }});
    clientMessageBus.subscribe({ callback: ({ message }) => {
      const responseMessage = message;
      expect(responseMessage).not.toBeUndefined();
      expect(responseMessage).not.toBeNull();
      {
        const { text } = responseMessage.getDecryptedContent();
        const { code } = responseMessage.getMessageStatus();
        expect(text).toEqual(expectedDecryptedServerText2);
        expect(code).toEqual(0); //success
      }
      expect(requestMessage2).not.toBeUndefined();
      expect(requestMessage2).not.toBeNull();
      {
        const { code } = requestMessage2.getMessageStatus();
        const { text } = requestMessage2.getDecryptedContent();
        expect(code).toEqual(2); //pending
        expect(text).toEqual(expectedDecryptedClientText2);
      }
      {
        const { senderHost, senderPort } = requestMessage2.getSenderAddress();
        expect(senderHost).toEqual('localhost');
        expect(senderPort).toEqual(3000);
      }
      setTimeout(done, 10000);
    }});
  });
});
