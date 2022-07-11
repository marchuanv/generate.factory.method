describe("when asking the http message handler to send and receive an http request messages", function() {
  
  const sender = { host: 'localhost', port: 2000 };
  const hostAddress = { address: 'localhost', port: 6000 };
  const userId = 'joe';
  const timeout = 5000;

  beforeAll(async () => {
    const { createHttpMessageHandler } = require('../../lib/factory/httpmessagehandler.factory');
    const { httpConnection, httpMessageHandler } = createHttpMessageHandler({ timeout, hostAddress, userId });
    this.httpConnection = httpConnection;
    this.httpMessageHandler = httpMessageHandler;
    await this.httpConnection.open();
  });

  it("it should succeed without any errors", async () => {
    
    // Arrange
    const epxectedData = 'Hello World From Server';
    const { createHttpResponseMessage } = require('../../lib/factory/httpresponsemessage.factory');
    this.httpMessageHandler.receive({ callback: ({ httpRequestMessage }) => {
      expect(httpRequestMessage).not.toBeNull();
      return createHttpResponseMessage({ userId, data: epxectedData, metadata: { sender }, messageStatusCode: 200 });
    }});

    // Act
    const { httpResponseMessage } = await this.httpMessageHandler.send({ path: '/', headers: { sender }, method: 'POST', data: 'Hello World!' });

    // Assert
    expect(httpResponseMessage).not.toBeNull();
    expect(httpResponseMessage.getContent()).toEqual(epxectedData);
  });

  afterAll(async () => {
    await this.httpConnection.close();
  });

});
