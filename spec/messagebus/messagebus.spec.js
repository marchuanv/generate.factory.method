describe("when publishing a message", function() {
 it("it should send the same message to all subscribers", async function() {

    // Arrange
    const host = "localhost";
    const port = 3000;
    const userId = 'joe';
    const timeout = 5000;
    const channelName = 'messagebustest';
    const expectedData = 'hello from subscription callback';

    const { createMessageBus } = require('../../lib/factory/messagebus.factory');
    const { messageBus, subscription } = createMessageBus({ host, port, userId, timeout, channelName });

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
