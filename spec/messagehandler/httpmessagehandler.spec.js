const { MessageStatus } = require("../../lib/messagestatus");

xdescribe("when asking the http message handler to send and receive an http request messages", function() {
  it("it should succeed without any errors", async function() {
    
    // Arrange
    const hostAddress = { address: 'localhost', port: 3000 };
    const sender = { address: 'localhost', port: 3000 };
    const httpMessageHandlerFactory = new HttpMessageHandlerFactory({ hostAddress, timeout: 5000 });
    const { httpMessageHandler, httpMessageFactory } = httpMessageHandlerFactory.create();

    httpMessageHandler.receive({ callback: ({ httpRequestMessage }) => {
      expect(httpRequestMessage).not.toBeNull();
      const httpResponseMessage = httpMessageFactory.createHttpResponseMessage({ 
        data: 'Hello From Server!',
        headers: {},
        messageStatus: new MessageStatus({ code: 0 })
      });
      return { httpResponseMessage };
    }});

    // Act
    const { httpResponseMessage } = await httpMessageHandler.send({ path: '/', headers: { sender }, method: 'POST', data: 'Hello World!' });

    // Assert
    expect(httpResponseMessage).not.toBeNull();
    expect(httpResponseMessage.getContent()).toEqual('Hello From Server!')
  });
});
