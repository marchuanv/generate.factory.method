const { createHttpServerStartedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstartedmessagequeuebinding.factory.js');
describe('when asking the HttpServerStartedMessageQueueBinding factory to create an instance of HttpServerStartedMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "scopeId": null,
    "factoryContainerBindingName": null
};

    // Act
    const {httpServerStartedMessageQueueBinding} = createHttpServerStartedMessageQueueBinding(testInputArgs);

    // Assert
    expect(httpServerStartedMessageQueueBinding).not.toBeNull();

  });
});
