const { createLogger } = require('C:\\component\\lib\\factory\\generated\\logger\\logger.factory.js');
describe('when asking the Logger factory to create an instance of Logger', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {logger} = createLogger(testInputArgs);

    // Assert
    expect(logger).not.toBeNull();

  });
});
