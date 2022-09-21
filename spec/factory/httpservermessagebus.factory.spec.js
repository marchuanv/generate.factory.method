const { createHttpServerMessageBus } = require('C:\\component\\lib\\factory\\httpservermessagebus.factory.js');
describe('when asking the HttpServerMessageBus factory to create an instance of HttpServerMessageBus', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "timeout": null,
    "factoryContainerBindingName": null,
    "senderHost": null,
    "senderPort": null
};

    // Act
    const {httpServerMessageBus} = createHttpServerMessageBus(testInputArgs);

    // Assert
    expect(httpServerMessageBus).not.toBeNull();

  });
});
