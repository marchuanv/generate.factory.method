describe("when asking the http message handler to send and receive an http request messages", function() {

  it("it should succeed without any errors", async () => {
    
    // Arrange
    const userId = 'joe';
    const sender = { host: 'localhost', port: 2000 };
    const epxectedData = 'Hello World From Server';
    const { createHttpResponseMessage } = require('../../lib/factory/httpresponsemessage.factory');
    const { createHttpRequestMessage } = require('../../lib/factory/httprequestmessage.factory');
    const { createHttpMessageHandler } = require('../../lib/factory/httpmessagehandler.factory');
    const { messageQueue, httpMessageHandler } = createHttpMessageHandler({ userId });

    httpMessageHandler.receive({ callback: ({ httpRequestMessage }) => {
      expect(httpRequestMessage).not.toBeNull();
      return createHttpResponseMessage({ userId, data: epxectedData, metadata: { sender }, messageStatusCode: 200 });
    }});
    const { httpRequestMessage } = createHttpRequestMessage({ method: 'POST', userId, data: 'Hello World!', metadata: { sender }, messageStatusCode: 2, path: 'test' });
    await messageQueue.enqueueHttpRequestMessage( { httpRequestMessage  });

    // Act
    const { httpResponseMessage } = await httpMessageHandler.send({ path: '/', headers: { sender }, method: 'POST', data: 'Hello World!' });

    // Assert
    expect(httpResponseMessage).not.toBeNull();
    expect(httpResponseMessage.getContent()).toEqual(epxectedData);
  });

});
