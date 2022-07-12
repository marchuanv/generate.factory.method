describe("when receiving data", function() {
 it("it should notify all subscribers", function() {
  
    // Arrange
    const channelName = 'channeltest';
    const expectedData = 'subscriptioncallback';
    const host = 'localhost';
    const port = 3000;
    const { createSubscription } = require('../../lib/factory/subscription.factory');
    const { subscription } = createSubscription({ channelName });
    subscription.onDataReceived({ callback: ({ host, port, data }) => {
        // Assert
        expect(host).toEqual('localhost');
        expect(port).toEqual(3000);
        expect(data).toEqual(expectedData);
    }});

    // Act
    subscription.receiveData({ host, port, data: expectedData  });

 })
});
