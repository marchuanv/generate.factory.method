describe("when asking the http message handler to send and receive an http request messages", function() {
  
  const sender = { host: 'localhost', port: 2000 };
  const hostAddress = { address: 'localhost', port: 6000 };
  const userId = 'joe';

  beforeAll(async () => {
    const { createHttpMessageHandler } = require('../../lib/factory/httpmessagehandler.factory');
    const { httpConnection, httpMessageHandler } = createHttpMessageHandler({ timeout: 5000, hostAddress, userId });
    this.httpConnection = httpConnection;
    await this.httpConnection.open();
    this.httpMessageHandler = httpMessageHandler;
  });
  it("it should succeed without any errors", async function() {
    
    // Arrange
    const { createHttpResponseMessage } = require('../../lib/factory/httpresponsemessage.factory');
    this.httpMessageHandler.receive({ callback: ({ httpRequestMessage }) => {
      expect(httpRequestMessage).not.toBeNull();
      return createHttpResponseMessage({ userId, data: 'Hello World from Server', metadata: { sender }, messageStatusCode: 200 });
    }});

    // Act
    const { httpResponseMessage } = await this.httpMessageHandler.send({ path: '/', headers: { sender }, method: 'POST', data: 'Hello World!' });

    // Assert
    expect(httpResponseMessage).not.toBeNull();
    expect(httpResponseMessage.getContent()).toEqual('Hello From Server!');
  });
  beforeAll(async () => {
    await this.httpConnection.close();
  });
});
