const { createHttpServerMessageBusManager } = require('C:\\component\\lib\\factory\\httpservermessagebusmanager.factory.js');
describe('when asking the HttpServerMessageBusManager factory to create an instance of HttpServerMessageBusManager', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": null,
    "scopeId": null
};

    // Act
    const {httpServerMessageBusManager} = createHttpServerMessageBusManager(testInputArgs);

    // Assert
    expect(httpServerMessageBusManager).not.toBeNull();

  });
});
