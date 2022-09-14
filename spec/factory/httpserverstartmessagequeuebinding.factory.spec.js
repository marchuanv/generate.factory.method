const { createHttpServerStartMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstartmessagequeuebinding.factory.js');
describe('when asking the HttpServerStartMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "Test"
}

    // Act
    const {httpServerStartMessageQueueBinding} = createHttpServerStartMessageQueueBinding(testInputArgs);
    // Assert
    expect(httpServerStartMessageQueueBinding).not.toBeNull();
  });
});
