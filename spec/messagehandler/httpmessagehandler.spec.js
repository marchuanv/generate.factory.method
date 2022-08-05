fdescribe("when asking the http message handler to send, receive and respond, to a request messages", function() {

  let userIdentity;
  const secret = 'httpmessagehandler1234';
  const userId = 'httpmessagehandler';

  beforeAll(() => {
    ({ userIdentity } = createUserIdentity({ userId }));
    userIdentity.register({ secret });
  });

  it("it should succeed without any errors", async () => {
    
    // Arrange
    const path = '/messagehandlertest';
    const senderHost = 'localhost';
    const senderPort = 3000;
    const recipientHost = 'localhost';
    const recipientPort = 3000;
    const timeout = 8000;
    const token = null;
    let _requestMessage = null;
    const { createMessage } = require('../../lib/factory/message.factory');
    const { createHttpMessageHandler } = require('../../lib/factory/httpmessagehandler.factory');
    const { createHttpConnection } = require('../../lib/factory/httpconnection.factory.js');
    const { messageHandlerQueue, httpMessageHandler } = createHttpMessageHandler({ messageQueueTypeCode: 1, recipientHost, recipientPort, userId, senderHost, senderPort });
    const { httpConnection } = createHttpConnection({ timeout, recipientHost, recipientPort, messageQueueTypeCode: 1, userId, senderHost, senderPort });
    await httpMessageHandler.start();
    await httpConnection.open();
    await messageHandlerQueue.open();
    expect(httpConnection.isOpen()).toBeTruthy();
    messageHandlerQueue.dequeueRequestMessage().then(async ({ requestMessage }) => {
      _requestMessage = requestMessage;
      const { message } = createMessage({ messageStatusCode: 0, Id: null, data: 'Hello From Server', recipientHost, recipientPort, userId, senderHost, senderPort, metadata: { path }});
      await messageHandlerQueue.enqueueResponseMessage({ responseMessage: message });
    });

    // Act
    const { message } = createMessage({ recipientHost, recipientPort, userId, data: 'Hello From Client', senderHost, senderPort, metadata: { path }, messageStatusCode: 2 });
    await messageHandlerQueue.enqueueRequestMessage({ requestMessage: message });
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
    expect(_requestMessage.getDecryptedContent()).toEqual('Hello From Client');
    {
      const { senderHost, senderPort } = _requestMessage.getSenderAddress();
      expect(senderHost).toEqual('localhost');
      expect(senderPort).toEqual(3000);
    }
    expect(responseMessage).not.toBeNull();
    expect(responseMessage.getDecryptedContent()).toEqual('Hello From Server');
    {
      const { code } = _requestMessage.getMessageStatus();
      expect(code).toEqual(0); //success
    }
  });

});
