const { createHttpServerMessageBus } = require('C:\\component\\lib\\factory\\generated\\httpservermessagebus\\httpservermessagebus.factory.js');
describe('when asking the HttpServerMessageBus factory to create an instance of HttpServerMessageBus', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "timeout": null,
    "factoryContainerBindingName": "factoryspec",
    "senderHost": null,
    "senderPort": null
};

    // Act
    const {httpServerMessageBus} = createHttpServerMessageBus(testInputArgs);

    // Assert
    expect(httpServerMessageBus).not.toBeNull();

  });
});
