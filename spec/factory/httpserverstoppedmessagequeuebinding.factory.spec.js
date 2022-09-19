const { createHttpServerStoppedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstoppedmessagequeuebinding.factory.js');
describe('when asking the HttpServerStoppedMessageQueueBinding factory to create an instance of HttpServerStoppedMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "scopeId": null,
    "factoryContainerBindingName": null
};

    // Act
    const {httpServerStoppedMessageQueueBinding} = createHttpServerStoppedMessageQueueBinding(testInputArgs);

    // Assert
    expect(httpServerStoppedMessageQueueBinding).not.toBeNull();

  });
});
