const { createSharedSubscriptions } = require('D:\\component\\lib\\factory\\sharedsubscriptions.factory.js');
describe('when asking the SharedSubscriptions factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('D:\\component\\spec\\factory\\sharedsubscriptions.factory.spec.variables.json');

    // Act
    const {sharedSubscriptions} = createSharedSubscriptions({});
    // Assert
    expect(sharedSubscriptions).not.toBeNull();
  });
});
