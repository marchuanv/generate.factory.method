const { MessageStatus } = require("../../lib/messagestatus");

describe("when asking the http message handler to send and receive an http request messages", function() {
  it("it should succeed without any errors", async function() {
    
    // Arrange
    const hostAddress = { address: 'localhost', port: 3000 };
    const sender = { address: 'localhost', port: 4000 };
    const userId = 'joe';
    const { createHttpResponseMessage } = require('../../lib/factory/httpresponsemessage.factory');
    const { createHttpMessageHandler } = require('../../lib/factory/httpmessagehandler.factory');

    const { messageQueue, httpMessageHandler } = createHttpMessageHandler({ timeout: 5000, hostAddress, userId });

    httpMessageHandler.receive({ callback: ({ httpRequestMessage }) => {
      expect(httpRequestMessage).not.toBeNull();
      const { httpResponseMessage } = createHttpResponseMessage({ userId, data: 'Hello World from Server', metadata: { sender }, messageStatusCode: 200 });
      messageQueue.enqueueHttpResponseMessage({ httpResponseMessage });
    }});

    // Act
    const { httpResponseMessage } = await httpMessageHandler.send({ path: '/', headers: { sender }, method: 'POST', data: 'Hello World!' });

    // Assert
    expect(httpResponseMessage).not.toBeNull();
    expect(httpResponseMessage.getContent()).toEqual('Hello From Server!')
  });
});
