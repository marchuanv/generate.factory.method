const { createHttpServerStartMessageQueueBinding } = require('C:\\component\\lib\\factory\\generated\\httpserverstartmessagequeuebinding\\httpserverstartmessagequeuebinding.factory.js');
describe('when asking the HttpServerStartMessageQueueBinding factory to create an instance of HttpServerStartMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {httpServerStartMessageQueueBinding} = createHttpServerStartMessageQueueBinding(testInputArgs);

    // Assert
    expect(httpServerStartMessageQueueBinding).not.toBeNull();

  });
});
