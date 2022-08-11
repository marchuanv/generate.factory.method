const { createSharedEventSubscriptions } = require('C:\\component\\lib\\factory\\sharedeventsubscriptions.factory.js');
describe('when asking the SharedEventSubscriptions factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\sharedeventsubscriptions.factory.spec.variables.json');

    // Act
    const {sharedEventSubscriptions} = createSharedEventSubscriptions({});
    // Assert
    expect(sharedEventSubscriptions).not.toBeNull();
  });
});
