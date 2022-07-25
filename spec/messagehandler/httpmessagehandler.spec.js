describe("when asking the http message handler to send, receive and respond, to a request messages", function() {
  it("it should succeed without any errors", async () => {
    
    // Arrange
    const userId = 'joe';
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

    const { messageHandlerQueue } = createHttpMessageHandler({ recipientHost, recipientPort, userId, senderHost, senderPort });
    const { httpConnection } = createHttpConnection({ timeout, recipientHost, recipientPort, userId, senderHost, senderPort });
    await httpConnection.open();
    expect(httpConnection.isOpen()).toBeTruthy();

    messageHandlerQueue.dequeueRequestMessage().then(async ({ requestMessage }) => {
      _requestMessage = requestMessage;
      const { message } = createMessage({ recipientHost, recipientPort, userId, data: 'Hello From Server', senderHost, senderPort, token, metadata: { path }, messageStatusCode: 0 });
      await messageHandlerQueue.enqueueResponseMessage({ responseMessage: message });
    });

    // Act
    const { message } = createMessage({ recipientHost, recipientPort, userId, data: 'Hello From Client', senderHost, senderPort, token, metadata: { path }, messageStatusCode: 2 });
    await messageHandlerQueue.enqueueRequestMessage({ requestMessage: message });
    const { responseMessage } = await messageHandlerQueue.dequeueResponseMessage();

    //Assert
    httpConnection.close();
    expect(httpConnection.isOpen()).toBeFalsy();
    expect(_requestMessage).not.toBeNull();
    expect(_requestMessage.getMessageStatus().code).toEqual(2); //pending
    expect(_requestMessage.getContent()).toEqual('Hello From Client');
    {
      const { senderHost, senderPort } = _requestMessage.getSenderAddress();
      expect(senderHost).toEqual('localhost');
      expect(senderPort).toEqual(3000);
    }
    expect(responseMessage).not.toBeNull();
    expect(responseMessage.getContent()).toEqual('Hello From Server');
    expect(responseMessage.getMessageStatus().code).toEqual(0); //success
  });

});
