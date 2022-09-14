const { createHttpServerStoppedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstoppedmessagequeuebinding.factory.js');
describe('when asking the HttpServerStoppedMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test"
}
    // Act
    const {httpServerStoppedMessageQueueBinding} = createHttpServerStoppedMessageQueueBinding(scopeId);
    // Assert
    expect(httpServerStoppedMessageQueueBinding).not.toBeNull();
  });
});
