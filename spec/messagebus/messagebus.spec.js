describe("when publishing a message", function() {
  
  let token = null;

  beforeAll(() => {
      const userId = 'messagebustestuser';
      const secret = 'messagebustest1234';
      const { createSharedUserSessions } = require('../../lib/factory/sharedusersessions.factory.js');
      const { sharedUserSessions } = createSharedUserSessions({});
      const { userSecurity } = sharedUserSessions.ensureSession({ userId });
      userSecurity.register({ secret });
      ({ token } = userSecurity.authenticate({ secret }));
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
    const messageQueueContextId = 'messagebustests';
    let subscriberMessages = [];

    const { createHttpConnection } = require('../../lib/factory/httpconnection.factory.js');
    const { createHttpMessageHandler } = require('../../lib/factory/httpmessagehandler.factory');
    const { httpConnection } = createHttpConnection({ timeout: 15000, messageQueueContextId, senderHost, senderPort });
    createHttpMessageHandler({ messageQueueContextId });

    await httpConnection.open();

    // Pre-Condition
    expect(httpConnection.isOpen()).toBeTruthy();

    const { createMessageBus } = require('../../lib/factory/messagebus.factory');
    const { messageBus } = createMessageBus({ 
      recipientHost, recipientPort, messageQueueContextId, channel, token, senderHost, senderPort,
    });

    await messageBus.start();
    messageBus.subscribe({ callback: ({ message }) => subscriberMessages.push(message) }); //Subscriber01
    messageBus.subscribe({ callback: ({ message }) => subscriberMessages.push(message) }); //Subscriber02
    messageBus.subscribe({ callback: ({ message }) => subscriberMessages.push(message) }); //Subscriber03

    // Act
    await messageBus.publish({ data });
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
