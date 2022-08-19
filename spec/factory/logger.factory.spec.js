const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
describe('when asking the Logger factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId} = require('C:\\component\\spec\\factory\\logger.factory.spec.variables.json');

    // Act
    const {logger} = createLogger({scopeId});
    // Assert
    expect(logger).not.toBeNull();
  });
});
