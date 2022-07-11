describe("when publishing a message", function() {
 it("it should send the same message to all subscribers", async function() {

    // Arrange
    const timeout = 5000;
    const userId = 'joe';
    const hostAddress = { address: 'localhost', port: 3000 };
    const channelName = 'messagebustest';
    const expectedData = 'hello from messagebus test';

    const { createMessageBus } = require('../../lib/factory/messagebus.factory');
    const { messageBus } = createMessageBus({ userId, timeout, hostAddress, channelName });

    messageBus.subscribe({ channelName, callback: (something) => {
      // Assert
      expect(something).not.toBeNull();
    }});

    // Act
    await messageBus.publish({ channelName, data: expectedData });
  })
});
