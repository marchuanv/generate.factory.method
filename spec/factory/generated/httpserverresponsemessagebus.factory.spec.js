const { createHttpServerResponseMessageBus } = require('C:\\component\\lib\\factory\\generated\\httpserverresponsemessagebus\\httpserverresponsemessagebus.factory.js');
describe('when asking the HttpServerResponseMessageBus factory to create an instance of HttpServerResponseMessageBus', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {httpServerResponseMessageBus} = createHttpServerResponseMessageBus(testInputArgs);

    // Assert
    expect(httpServerResponseMessageBus).not.toBeNull();

  });
});
