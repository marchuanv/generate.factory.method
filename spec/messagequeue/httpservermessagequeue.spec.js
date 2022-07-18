const { createHttpServerMessageQueue } = require("../../lib/factory/httpservermessagequeue.factory");
const { createHttpClientMessageQueue } = require("../../lib/factory/httpclientmessagequeue.factory");
const { createMessage } = require("../../lib/factory/message.factory");
describe("when asking", function() {
  it("it should", function() {

    // Arrange
    const recipientHost = 'localhost';
    const recipientPort = 3000;
    const senderHost = 'localhost';
    const senderPort = 3000;
    const userId = 'joe';
    const messageStatusCode = 2;
    const metadata = {};
    const data = 'Hello World';

    const { httpServerMessageQueue } = createHttpServerMessageQueue({ 
      recipientHost, recipientPort, userId, 
      senderHost, senderPort
    });

    const { httpClientMessageQueue } = createHttpClientMessageQueue({
      recipientHost, recipientPort, userId, 
      senderHost, senderPort
    });

    // Act
    httpClientMessageQueue.enqueueHttpRequest(createMessage({
      recipientHost, recipientPort, userId, data,
      senderHost, senderPort, token, metadata, messageStatusCode
    }));

    // Assert
  });
});
