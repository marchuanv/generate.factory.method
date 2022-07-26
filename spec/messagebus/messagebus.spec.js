describe("when publishing a message", function() {
 it("it should publish to all subscribers", async function() {

    // Arrange
    const userId = 'joe';
    const channel = 'messagebustest';
    const expectedData = 'publishing some data';
    const senderHost = 'localhost';
    const senderPort = 3000;
    const recipientHost = 'localhost';
    const recipientPort = 3000;
    const data = 'publishing some data';
    let subscriberMessages = [];

    const { createMessageBus } = require('../../lib/factory/messagebus.factory');
    const { messageBus } =  createMessageBus({ userId, messageQueueTypeCode: 3, senderHost, senderPort, recipientHost, recipientPort, channel });

    await messageBus.start();
    messageBus.subscribe({ callback: ({ message }) => subscriberMessages.push(message) }); //Subscriber01
    messageBus.subscribe({ callback: ({ message }) => subscriberMessages.push(message) }); //Subscriber02
    messageBus.subscribe({ callback: ({ message }) => subscriberMessages.push(message) }); //Subscriber03

    // Act
    await messageBus.publish({ data });
    await messageBus.stop();

    // Assert
    expect(subscriberMessages.length).toEqual(3);
    expect(data).toEqual(expectedData);
  })
});
