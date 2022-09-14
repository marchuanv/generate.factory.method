const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
describe('when asking the Logger factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "Test"
}

    // Act
    const {logger} = createLogger(testInputArgs);
    // Assert
    expect(logger).not.toBeNull();
  });
});
