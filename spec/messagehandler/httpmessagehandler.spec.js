describe("when asking the http message handler to send, receive and respond, to a request messages", function() {

  it("it should succeed without any errors", async () => {
    
    // Arrange
    const userId = 'joe';
    const senderHost = 'localhost';
    const senderPort = 2000;
    const token = null;
    const expectedRequestData = 'Hello World';
    const expectedResponsetData = 'Hello World From Server';
    const { createMessage } = require('../../lib/factory/message.factory');
    const { createHttpMessageHandler } = require('../../lib/factory/httpmessagehandler.factory');
    const { httpMessageHandler } = createHttpMessageHandler({ userId });
    let _requestMessage = null;

    httpMessageHandler.receive({ callback: async ({ requestMessage }) => {
      const { message } = createMessage({ senderHost, senderPort, userId, data: expectedResponsetData, token, messageStatusCode: 200 });
      await httpMessageHandler.respond({ responseMessage: message });
      expect(requestMessage).not.toBeNull();
      _requestMessage = requestMessage;
    }});

    // Act
    const { message } = createMessage({ senderHost, senderPort, userId, data: expectedRequestData, token, messageStatusCode: 2 });
    const { responseMessage } = await httpMessageHandler.send({ requestMessage: message });

    //Assert
    expect(_requestMessage).not.toBeNull();
    const data = _requestMessage.getContent();
    const address = _requestMessage.getSenderAddress();
    expect(address.senderHost).toEqual('localhost');
    expect(address.senderPort).toEqual(2000);
    expect(data).toEqual(expectedRequestData);
    expect(responseMessage).not.toBeNull();
    expect(responseMessage.getContent()).toEqual(expectedResponsetData);
   
  });

});
