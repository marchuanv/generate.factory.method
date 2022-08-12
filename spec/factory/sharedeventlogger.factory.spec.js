const { createSharedEventLogger } = require('C:\\component\\lib\\factory\\sharedeventlogger.factory.js');
describe('when asking the SharedEventLogger factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\sharedeventlogger.factory.spec.variables.json');

    // Act
    const {sharedEventLogger} = createSharedEventLogger({});
    // Assert
    expect(sharedEventLogger).not.toBeNull();
  });
});
