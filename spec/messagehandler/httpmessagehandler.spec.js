describe("when asking the http message handler to send, receive and respond, to a request messages", function() {

  it("it should succeed without any errors", async () => {
    
    // Arrange
    const userId = 'joe';
    const sender = { host: 'localhost', port: 2000 };
    const expectedRequestData = 'Hello World';
    const expectedResponsetData = 'Hello World From Server';
    const { createMessage } = require('../../lib/factory/message.factory');
    const { createHttpMessageHandler } = require('../../lib/factory/httpmessagehandler.factory');
    const { httpMessageHandler } = createHttpMessageHandler({ userId });
    let _requestMessage = null;

    httpMessageHandler.receive({ callback: async ({ requestMessage }) => {
      const { message } = createMessage({ userId, data: expectedResponsetData, metadata: { sender }, messageStatusCode: 200 });
      await httpMessageHandler.respond({ responseMessage: message });
      expect(requestMessage).not.toBeNull();
      _requestMessage = requestMessage;
    }});

    // Act
    const { message } = createMessage({ userId, data: expectedRequestData, metadata: { sender, method: 'POST' }, messageStatusCode: 2 });
    const { responseMessage } = await httpMessageHandler.send({ requestMessage: message });

    //Assert
    expect(_requestMessage).not.toBeNull();
    const data = _requestMessage.getContent();
    const { host, port } = _requestMessage.getSenderAddress();
    expect(host).toEqual('localhost');
    expect(port).toEqual(2000);
    expect(data).toEqual(expectedRequestData);
    expect(responseMessage).not.toBeNull();
    expect(responseMessage.getContent()).toEqual(expectedResponsetData);
   
  });

});
