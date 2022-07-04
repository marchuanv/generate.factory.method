[FactoryRequireScripts]
describe('when asking Subscription to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    // Act
    const instance = new SubscriptionFactory({ channelName });
    // Assert
    expect(instance).not.toBeNull();
  });
});
