describe("when publishing a message", function() {
 it("it should send the same message to all subscribers", async function() {

    // Arrange
    const userId = 'joe';
    const channelName = 'messagebustest';
    const expectedData = 'hello from subscription callback';
    const senderHost = 'localhost';
    const senderPort = 200;

    const { createMessageBus } = require('../../lib/factory/messagebus.factory');
    const { messageBus, subscription } = createMessageBus({ userId, senderHost, senderPort, channelName });

    subscription.onDataReceived({ callback: ({ senderHost, senderPort, data }) => {
      // Assert
      expect(senderHost).toEqual('localhost');
      expect(senderPort).toEqual(3000);
      expect(data).toEqual(expectedData);
    }});

    // Act
    await messageBus.publish({ data: expectedData });
  })
});
