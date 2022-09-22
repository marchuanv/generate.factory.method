const { createHttpServerStoppedMessageQueueBinding } = require('C:\\component\\lib\\factory\\generated\\httpserverstoppedmessagequeuebinding\\httpserverstoppedmessagequeuebinding.factory.js');
describe('when asking the HttpServerStoppedMessageQueueBinding factory to create an instance of HttpServerStoppedMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {httpServerStoppedMessageQueueBinding} = createHttpServerStoppedMessageQueueBinding(testInputArgs);

    // Assert
    expect(httpServerStoppedMessageQueueBinding).not.toBeNull();

  });
});
