
describe("when queuing messages given bindings", function() {

  it("it should dequeue a queued message", async function() {

    // Arrange
    const recipientHost = 'localhost';
    const recipientPort = 3000;
    const senderHost = 'localhost';
    const senderPort = 3000;
    const userId = 'joe';
    const messageStatusCode = 2;
    const metadata = {};
    const data = 'Hello World';
    const token = null;
    const { createSharedMessageQueue } = require("../../lib/factory/sharedmessagequeue.factory");
    const { createMessage } = require("../../lib/factory/message.factory");
    const { sharedMessageQueue } = createSharedMessageQueue({});
    let sentMessageId = '';
    let sentMessageContent = '';
    await sharedMessageQueue.bind({ messageQueueType: "test" });

    // Act
    {
      const { message } = createMessage({ recipientHost, recipientPort, userId, data, senderHost, senderPort, token, metadata, messageStatusCode });
      await sharedMessageQueue.queueMessage({ message, messageQueueType: "test" });
      sentMessageId = message.getId();
      sentMessageContent = message.getContent();
    }

    // Assert
    const { message } = await sharedMessageQueue.dequeueMessage({ messageQueueType: "test" });
    expect(message).not.toBeNull();
    expect(message.getId()).toEqual(sentMessageId);
    expect(message.getContent()).toEqual(sentMessageContent);
  });

});
