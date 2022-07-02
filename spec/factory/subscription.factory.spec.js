const { SubscriptionFactory } = require('D:\\component\\lib\\subscription.factory.js');
[factoryVariableNames]


describe('when asking Subscription to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]

    
    const channelName = null;
    // Act
    const instance = new SubscriptionFactory({ channelName });
    // Assert
    expect(instance).not.toBeNull();
  });
});
