const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
describe('when asking the Logger factory to create an instance of Logger', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test"
};

    // Act
    const {logger} = createLogger(testInputArgs);

    // Assert
    expect(logger).not.toBeNull();

  });
});
