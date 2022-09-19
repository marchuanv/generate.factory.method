const { createHttpServerStartMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstartmessagequeuebinding.factory.js');
describe('when asking the HttpServerStartMessageQueueBinding factory to create an instance of HttpServerStartMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "scopeId": null
};

    // Act
    const {httpServerStartMessageQueueBinding} = createHttpServerStartMessageQueueBinding(testInputArgs);

    // Assert
    expect(httpServerStartMessageQueueBinding).not.toBeNull();

  });
});
