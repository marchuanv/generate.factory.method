describe("when asking the message handler to send and receive request messages", function() {
  
  it("it should succeed without any errors", async function() {
    
    // Arrange
    const sender = { host: 'localhost', port: 2000 };
    const hostAddress = { host: 'localhost', port: 7000 };
    const userId = 'joe';
    const epxectedData = 'Hello World From Server';
    const timeout = 5000;
    const { createMessage } = require('../../lib/factory/message.factory');
    const { createMessageHandler } = require('../../lib/factory/messagehandler.factory');
    const { createHttpRequestMessage } = require('../../lib/factory/httprequestmessage.factory');
    const { messageHandler, messageQueue } = createMessageHandler({ timeout, userId, hostAddress });

    messageHandler.receive({ callback: ({ requestMessage }) => {
      expect(requestMessage).not.toBeNull();
      const { message } = createMessage({ userId, data: epxectedData, metadata: { sender }, messageStatusCode: 200 });
      return { responseMessage: message };
    }});

    // //emulate server
    // const { httpRequestMessage } = createHttpRequestMessage({ method: 'POST', userId, data: 'Hello World!', metadata: { sender }, messageStatusCode: 2, path: 'test' });
    // await messageQueue.enqueueRequestMessage( { httpRequestMessage   });

    // Act
    const message = await messageHandler.send({ metadata: { sender }, data: 'Hello World!' });

    // Assert
    expect(message).not.toBeNull();
  });
  
});
