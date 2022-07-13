describe("when publishing a message", function() {
 it("it should send the same message to all subscribers", async function() {

    // Arrange
    const userId = 'joe';
    const channelName = 'messagebustest';
    const expectedData = 'hello from subscription callback';

    const { createMessageBus } = require('../../lib/factory/messagebus.factory');
    const { messageBus, subscription } = createMessageBus({ userId, host, port, channelName });

    subscription.onDataReceived({ callback: ({ host, port, data }) => {
      // Assert
      expect(host).toEqual('localhost');
      expect(port).toEqual(3000);
      expect(data).toEqual(expectedData);
    }});

    // Act
    await messageBus.publish({ data: expectedData });
  })
});
