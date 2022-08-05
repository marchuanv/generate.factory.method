fdescribe("when asking the http message handler to send, receive and respond, to a request messages", function() {

  const secret = 'httpmessagehandler1234';
  const userId = 'httpmessagehandler';

  beforeAll(() => {
    const { createSharedUserSessions } = require('../../lib/factory/sharedusersessions.factory.js');
    const { sharedUserSessions } = createSharedUserSessions({});
    const { userSecurity } = sharedUserSessions.ensureSession({ userId });
    userSecurity.register({ secret });
    userSecurity.authenticate({ secret });
  });

  it("it should succeed without any errors", async () => {
    
    // Arrange
    const path = '/messagehandlertest';
    const senderHost = 'localhost';
    const senderPort = 3000;
    const recipientHost = 'localhost';
    const recipientPort = 3000;
    const timeout = 8000;
    let expectedDecryptedServerText;
    let expectedDecryptedClientText;
    let _requestMessage = null;
    const { createMessage } = require('../../lib/factory/message.factory');
    const { createHttpMessageHandler } = require('../../lib/factory/httpmessagehandler.factory');
    const { createHttpConnection } = require('../../lib/factory/httpconnection.factory.js');
    const { messageHandlerQueue, httpMessageHandler } = createHttpMessageHandler({ messageQueueTypeCode: 1 });
    const { httpConnection } = createHttpConnection({ timeout, messageQueueTypeCode: 1, senderHost, senderPort });
    await httpMessageHandler.start();
    await httpConnection.open();
    await messageHandlerQueue.open();
    expect(httpConnection.isOpen()).toBeTruthy();
    messageHandlerQueue.dequeueRequestMessage().then(async ({ requestMessage }) => {
      _requestMessage = requestMessage;
      const { message } = createMessage({ messageStatusCode: 0, Id: null, data: 'Hello From Server', recipientHost, recipientPort, userId, senderHost, senderPort, metadata: { path }});
      await messageHandlerQueue.enqueueResponseMessage({ responseMessage: message });
      const { text } = message.getDecryptedContent();
      expectedDecryptedServerText = text;
    });
    const { message } = createMessage({ messageStatusCode: 2, Id: null, data: 'Hello From Client', recipientHost, recipientPort, metadata: { path, userId }, senderHost, senderPort });
    {
      const { text } = message.getDecryptedContent();
      expectedDecryptedClientText = text;
    }

    // Act
    await messageHandlerQueue.enqueueRequestMessage({ message });
    const { responseMessage } = await messageHandlerQueue.dequeueResponseMessage();

    //Assert
    await messageHandlerQueue.close();
    await httpConnection.close();
    expect(httpConnection.isOpen()).toBeFalsy();
    expect(_requestMessage).not.toBeNull();
    {
      const { code } = _requestMessage.getMessageStatus();
      expect(code).toEqual(2); //pending
    }
    {
      const { text } = _requestMessage.getDecryptedContent();
      expect(text).toEqual(expectedDecryptedClientText);
    }
    {
      const { senderHost, senderPort } = _requestMessage.getSenderAddress();
      expect(senderHost).toEqual('localhost');
      expect(senderPort).toEqual(3000);
    }
    expect(responseMessage).not.toBeNull();
    {
      const { text } = _requestMessage.getDecryptedContent();
      expect(text).toEqual(expectedDecryptedServerText);
    }
    {
      const { code } = _requestMessage.getMessageStatus();
      expect(code).toEqual(0); //success
    }
  });

});
