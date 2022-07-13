describe("when asking the message handler to send and receive request messages", function() {
  
  it("it should succeed without any errors", async function() {
    
    // Arrange
    const userId = 'joe';
    const senderHost = 'localhost';
    const senderPort = 2000;
    const expectedRequestData = 'Hello World';
    const expectedResponsetData = 'Hello World From Server';
    const { createMessageHandler } = require('../../lib/factory/messagehandler.factory');
    const { messageHandler } = createMessageHandler({ userId, senderHost, senderPort });
    let _requestMessage = null;

    messageHandler.receive({ callback: async ({ requestMessage }) => {
      await messageHandler.respond({ data: expectedResponsetData, metadata: {} });
      expect(requestMessage).not.toBeNull();
      _requestMessage = requestMessage;
    }});

    // Act
    const { responseMessage } = await messageHandler.send({ data: expectedRequestData, metadata: {} });

    //Assert
    expect(_requestMessage).not.toBeNull();
    const data = _requestMessage.getContent();
    const adress = _requestMessage.getSenderAddress();
    expect(adress.senderHost).toEqual('localhost');
    expect(adress.senderPort).toEqual(2000);
    expect(data).toEqual(expectedRequestData);
    expect(responseMessage).not.toBeNull();
    expect(responseMessage.getContent()).toEqual(expectedResponsetData);
  });
  
});
