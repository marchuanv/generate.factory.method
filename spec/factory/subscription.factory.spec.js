const { SubscriptionFactoryFactory } = require('C:\\component\\lib\\subscription.factory.js'); 

describe('when asking SubscriptionFactory factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const { channelName } = [];
    // Act
    const instance = new SubscriptionFactoryFactory({ channelName });
    // Assert
    expect(instance).not.toBeNull();
  });
});
