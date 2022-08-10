describe("when asking the http message handler to send, receive and respond, to a request messages", function() {

  let token = null;

  beforeAll(() => {
    const userId = 'httpmessagehandler';
    const secret = 'httpmessagehandler1234';
    const { createSharedUserSessions } = require('../../lib/factory/sharedusersessions.factory.js');
    const { sharedUserSessions } = createSharedUserSessions({});
    const { userSecurity } = sharedUserSessions.ensureSession({ userId });
    userSecurity.register({ secret });
    ({ token } = userSecurity.authenticate({ secret }));
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
    let requestMessage = null;
    const { createMessage } = require('../../lib/factory/message.factory');
    const { createHttpMessageHandler } = require('../../lib/factory/httpmessagehandler.factory');
    const { createHttpConnection } = require('../../lib/factory/httpconnection.factory.js');
    const { messageHandlerQueue, httpMessageHandler } = createHttpMessageHandler({ messageQueueTypeCode: 1 });
    const { httpConnection } = createHttpConnection({ timeout, messageQueueTypeCode: 1, senderHost, senderPort });
    await httpMessageHandler.start();
    await httpConnection.open();
    await messageHandlerQueue.open();
    expect(httpConnection.isOpen()).toBeTruthy();
    messageHandlerQueue.dequeueRequestMessage().then(async ({ message }) => {
      requestMessage = message;
      {
        const { message } = createMessage({ messageStatusCode: 0, Id: null, data: 'Hello From Server', recipientHost, recipientPort, metadata: { path, token }, senderHost, senderPort });
        await messageHandlerQueue.enqueueResponseMessage({ message });
        const { text } = message.getDecryptedContent();
        expectedDecryptedServerText = text;
      }
    });
   

    // Act
    {
      const { message } = createMessage({ messageStatusCode: 2, Id: null, data: 'Hello From Client', recipientHost, recipientPort, metadata: { path, token }, senderHost, senderPort });
      {
        const { text } = message.getDecryptedContent();
        expectedDecryptedClientText = text;
      }
      await messageHandlerQueue.enqueueRequestMessage({ message });
    }
    const { message } = await messageHandlerQueue.dequeueResponseMessage();
    const responseMessage = message;

    //Assert
    await messageHandlerQueue.close();
    await httpConnection.close();
    expect(httpConnection.isOpen()).toBeFalsy();

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
  });

});
