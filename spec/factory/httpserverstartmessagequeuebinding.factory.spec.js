const { createHttpServerStartMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstartmessagequeuebinding.factory.js');
describe('when asking the HttpServerStartMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test"
}
    // Act
    const {httpServerStartMessageQueueBinding} = createHttpServerStartMessageQueueBinding(scopeId);
    // Assert
    expect(httpServerStartMessageQueueBinding).not.toBeNull();
  });
});
