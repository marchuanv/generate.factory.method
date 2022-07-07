const { createSubscription } = require('C:\\component\\lib\\factory\\subscription.factory.js');
describe('when asking Subscription to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\subscription.factory.spec.variables.json');

    // Act
    const instance = createSubscription({  });
    // Assert
    expect(instance).not.toBeNull();
  });
});
