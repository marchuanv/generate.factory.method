const { createSubscriptionHandler } = require('C:\\component\\lib\\factory\\subscriptionhandler.factory.js');
describe('when asking the SubscriptionHandler factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {channelName} = require('C:\\component\\spec\\factory\\subscriptionhandler.factory.spec.variables.json');

    // Act
    const {subscriptionHandler} = createSubscriptionHandler({channelName});
    // Assert
    expect(subscriptionHandler).not.toBeNull();
  });
});
