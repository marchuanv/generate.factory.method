describe("when publishing a message", function() {
 it("it should send the same message to all subscribers", async function() {

    // Arrange
    const host = "localhost";
    const port = 3000;
    const userId = 'joe';
    const timeout = 5000;
    const channelName = 'messagebustest';
    const expectedData = 'hello from messagebus test';

    const { createMessageBus } = require('../../lib/factory/messagebus.factory');
    const { messageBus } = createMessageBus({ host, port, userId, timeout, channelName });

    messageBus.subscribe({ callback: ({ host, port, data }) => {
      // Assert
      expect(host).toEqual('localhost');
      expect(port).toEqual(3000);
      expect(data).toEqual('hello from messagebus test');
    }});

    // Act
    await messageBus.publish({ data: expectedData });
  })
});
