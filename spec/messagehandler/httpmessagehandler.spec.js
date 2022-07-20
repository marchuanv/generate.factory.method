describe("when asking the http message handler to send, receive and respond, to a request messages", function() {
  it("it should succeed without any errors", async () => {
    
    // Arrange
    const userId = 'joe';
    const path = '/messagehandlertest';
    const senderHost = 'localhost';
    const senderPort = 3000;
    const recipientHost = 'localhost';
    const recipientPort = 3000;
    let _requestMessage = null;

    const { createMessage } = require('../../lib/factory/message.factory');
    const { createHttpMessageHandler } = require('../../lib/factory/httpmessagehandler.factory');
    const { createHttpConnection } = require('../../lib/factory/httpconnection.factory.js');

    const { httpMessageHandler, messageQueue } = createHttpMessageHandler({ recipientHost, recipientPort, userId, senderHost, senderPort });
    const { httpConnection } = createHttpConnection({ 
        timeout: 8000,
        recipientHost: 'localhost',
        recipientPort: 3000,
        userId: 'joe',
        senderHost: 'localhost',
        senderPort: 3000
    });
    await httpConnection.open();
    expect(httpConnection.isOpen()).toBeTruthy();

    httpMessageHandler.receiveFromQueue().then(async ()=> {

      const { requestMessage } = await messageQueue.dequeueRequestMessage();
      _requestMessage = requestMessage;

      // const { message } = createMessage({ 
      //   recipientHost: 'localhost',
      //   recipientPort: 3000,
      //   userId: 'joe',
      //   data: 'Hello From Server',
      //   senderHost: 'localhost',
      //   senderPort: 3000,
      //   token: null,
      //   metadata: { path },
      //   messageStatusCode: 2 //pending
      // });

    });
   
    // Act
    httpMessageHandler.sendToQueue();
    await messageQueue.enqueueRequestMessage(createMessage({ 
      recipientHost: 'localhost',
      recipientPort: 3000,
      userId: 'joe',
      data: 'Hello From Server',
      senderHost: 'localhost',
      senderPort: 3000,
      token: null,
      metadata: { path },
      messageStatusCode: 2 //pending
    }));
    const { responseMessage } = await messageQueue.dequeueResponseMessage();

    //Assert
    httpConnection.close();
    expect(httpConnection.isOpen()).toBeFalsy();
    expect(_requestMessage).not.toBeNull();
    expect(_requestMessage.getMessageStatus().code).toEqual(2); //pending
    const data = _requestMessage.getContent();
    const address = _requestMessage.getSenderAddress();
    expect(address.senderHost).toEqual('localhost');
    expect(address.senderPort).toEqual(2000);
    expect(data).toEqual(expectedRequestData);
    expect(responseMessage).not.toBeNull();
    expect(responseMessage.getContent()).toEqual(expectedResponsetData);
    expect(responseMessage.getMessageStatus().code).toEqual(0); //success
  });

});
