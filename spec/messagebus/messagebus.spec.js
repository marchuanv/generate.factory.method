describe("when publishing a message", function() {
  
  let userId = null;
  let secret = null;

  beforeAll(() => {
      userId = 'messagebustest';
      secret = 'messagebustest1234';
      const { createSharedUserSessions } = require('../../lib/factory/sharedusersessions.factory.js');
      const { sharedUserSessions } = createSharedUserSessions({});
      const { userSecurity } = sharedUserSessions.ensureSession({ userId });
      userSecurity.register({ secret });
  });

 it("it should publish to all subscribers", async function() {

    // Arrange
    const data = 'publishing some data';
    const channel = 'blalbla';
    const expectedData = 'publishing some data';
    const senderHost = 'localhost';
    const senderPort = 3000;
    const recipientHost = 'localhost';
    const recipientPort = 3000;
    let subscriberMessages = [];

    const { createHttpConnection } = require('../../lib/factory/httpconnection.factory.js');
    const { createHttpMessageHandler } = require('../../lib/factory/httpmessagehandler.factory');
    const { httpConnection } = createHttpConnection({ timeout: 8000, messageQueueTypeCode: 1, senderHost, senderPort });
    const { httpMessageHandler } = createHttpMessageHandler({ messageQueueTypeCode: 1 });

    await httpConnection.open();
    await httpMessageHandler.start();

    // Pre-Condition
    expect(httpConnection.isOpen()).toBeTruthy();

    const { createMessageBus } = require('../../lib/factory/messagebus.factory');
    const { messageBus } = createMessageBus({ 
      recipientHost, recipientPort,
      messageQueueTypeCode: 3,
      channel, senderHost, senderPort,
    });

    await messageBus.start();
    messageBus.subscribe({ callback: ({ message }) => subscriberMessages.push(message) }); //Subscriber01
    messageBus.subscribe({ callback: ({ message }) => subscriberMessages.push(message) }); //Subscriber02
    messageBus.subscribe({ callback: ({ message }) => subscriberMessages.push(message) }); //Subscriber03

    // Act
    await messageBus.publish({ userId, secret, data });
    await messageBus.stop();

    // Assert
    expect(subscriberMessages.length).toEqual(3);
    for(const msg of subscriberMessages) {
      const { text } = msg.getDecryptedContent();
      expect(text).toEqual(data);
    }
    expect(data).toEqual(expectedData);

    await httpConnection.close();
    expect(httpConnection.isOpen()).toBeFalsy();
  })
});
