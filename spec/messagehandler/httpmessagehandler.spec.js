describe("when asking the http message handler to send, receive and respond, to a request messages", function() {

  it("it should succeed without any errors", async (done) => {
    
    // Arrange
    const userId = 'joe';
    const sender = { host: 'localhost', port: 2000 };
    const expectedData = 'Hello World From Server';
    const { createMessage } = require('../../lib/factory/message.factory');
    const { createHttpRequestMessage } = require('../../lib/factory/httprequestmessage.factory');
    const { createHttpMessageHandler } = require('../../lib/factory/httpmessagehandler.factory');
    const { httpMessageHandler } = createHttpMessageHandler({ userId });

    httpMessageHandler.receive({ callback: async ({ requestMessage }) => {
      expect(requestMessage).not.toBeNull();

      const data = requestMessage.getContent();
      const { host, port } = requestMessage.getSenderAddress();

      expect(host).toEqual('localhost');
      expect(port).toEqual(2000);
      expect(data).toEqual(expectedData);

      const { message } = createMessage({ userId, data: expectedData, metadata: { sender }, messageStatusCode: 200 });
      await httpMessageHandler.respond({ responseMessage: message });

      done();
    }});

    // Act
    const { message } = createMessage({ userId, data: 'Hello World!', metadata: { sender, method: 'POST' }, messageStatusCode: 2 });
    const { httpResponseMessage } = await httpMessageHandler.send({ requestMessage: message });

    // Assert
    expect(httpResponseMessage).not.toBeNull();
    expect(httpResponseMessage.getContent()).toEqual(epxectedData);
  });

});
