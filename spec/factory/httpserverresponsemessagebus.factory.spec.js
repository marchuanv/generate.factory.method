const { createHttpServerResponseMessageBus } = require('C:\\component\\lib\\factory\\httpserverresponsemessagebus.factory.js');
describe('when asking the HttpServerResponseMessageBus factory to create an instance of HttpServerResponseMessageBus', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "scopeId": null,
    "factoryContainerBindingName": null
};

    // Act
    const {httpServerResponseMessageBus} = createHttpServerResponseMessageBus(testInputArgs);

    // Assert
    expect(httpServerResponseMessageBus).not.toBeNull();

  });
});
