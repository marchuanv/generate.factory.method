describe("when queuing messages given bindings", function() {

  let token = null;

  beforeAll(() => {
    const userId = 'sharedmessagequeue';
    const secret = 'sharedmessagequeue1234';
    const { createSharedUserSessions } = require('../../lib/factory/sharedusersessions.factory.js');
    const { sharedUserSessions } = createSharedUserSessions({});
    const { userSecurity } = sharedUserSessions.ensureSession({ userId });
    userSecurity.register({ secret });
    ({ token } = userSecurity.authenticate({ secret }));
  });

  it("it should dequeue a queued message", async function() {

    // Arrange
    let expectedDecryptedText;
    let actualDecryptedText;
    const recipientHost = 'localhost';
    const recipientPort = 3000;
    const senderHost = 'localhost';
    const senderPort = 3000;
    const messageStatusCode = 2;
    const metadata = { };
    const data = 'Hello World';
    const { createSharedMessageQueue } = require("../../lib/factory/sharedmessagequeue.factory");
    const { createMessage } = require("../../lib/factory/message.factory");
    const { sharedMessageQueue } = createSharedMessageQueue({});
    let sentMessageId = '';
    await sharedMessageQueue.bind({ queueName: "test" });

    // Act
    {
      const { message } = createMessage({ messageStatusCode, Id: null, data, recipientHost, recipientPort, metadata, token, senderHost, senderPort });
      await sharedMessageQueue.queueMessage({ message, queueName: "test" });
      sentMessageId = message.getId();
      const { text } = message.getDecryptedContent();
      expectedDecryptedText = text;
    }

    // Assert
    {  //variable scoping
      const { message } = await sharedMessageQueue.dequeueMessage({ queueName: "test" });
      expect(message).not.toBeNull();
      expect(message.getId()).toEqual(sentMessageId);
      const { text } = message.getDecryptedContent() || {};
      actualDecryptedText = text;
    }
    expect(actualDecryptedText).not.toBeUndefined();
    expect(actualDecryptedText).not.toBeNull();
    expect(actualDecryptedText).toEqual(expectedDecryptedText);
  });

});
