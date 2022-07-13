describe("when receiving data", function() {
 it("it should notify all subscribers", function() {
  
    // Arrange
    const channelName = 'channeltest';
    const expectedData = 'subscriptioncallback';
    const { createSubscription } = require('../../lib/factory/subscription.factory');
    const { subscription } = createSubscription({ channelName });
    subscription.onDataReceived({ callback: ({ senderHost, senderPort, data }) => {
        // Assert
        expect(senderHost).toEqual('localhost');
        expect(senderPort).toEqual(3000);
        expect(data).toEqual(expectedData);
    }});

    // Act
    subscription.receiveData({ senderHost: 'localhost', senderPort: 3000, data: expectedData  });

 })
});
