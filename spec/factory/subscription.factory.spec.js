const { SubscriptionFactory } = require('C:\\component\\lib\\subscription.factory.js'); 

describe('when asking Subscription to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const {} = [];
    const {} = [];
    // Act
    const instance = new SubscriptionFactory({ channelName });
    // Assert
    expect(instance).not.toBeNull();
  });
});
