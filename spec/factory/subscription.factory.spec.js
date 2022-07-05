const { createSubscription } = require('C:\\component\\lib\\factory\\subscription.factory.js');
describe('when asking Subscription to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const channelName = 'test';

    // Act
    const instance = createSubscription({ channelName });
    // Assert
    expect(instance).not.toBeNull();
  });
});
