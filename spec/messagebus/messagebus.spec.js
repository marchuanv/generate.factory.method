xdescribe("when publishing a message", function() {
 it("it should send the same message to all subscribers", async function() {

    // Arrange
    const userId = 'joe';
    const channelName = 'messagebustest';
    const expectedData = 'hello from subscription callback';
    const senderhost = 'localhost';
    const senderport = 2000;
    const subscriptionData = 'subscriptiondata';
    const token = null;
    const messageStatusCode = 2;

    const { createMessageBus } = require('../../lib/factory/messagebus.factory');
    const { messageBus, subscriptionMessage, messageQueue } =  createMessageBus({ 
                                            userId, 
                                            senderHost: senderhost,
                                            senderPort: senderport,
                                            data: subscriptionData,
                                            token,
                                            messageStatusCode,
                                            channelName
                                          });
    subscription.onDataReceived({ callback: ({ senderHost, senderPort, data }) => {
      // Assert
      expect(senderHost).toEqual('localhost');
      expect(senderPort).toEqual(2000);
      expect(data).toEqual(expectedData);
    }});

    // Act
    await messageBus.publish({ data: expectedData });
  })
});
