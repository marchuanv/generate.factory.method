const { createHttpServerStoppedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstoppedmessagequeuebinding.factory.js');
describe('when asking the HttpServerStoppedMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test"
}

    // Act
    const {httpServerStoppedMessageQueueBinding} = createHttpServerStoppedMessageQueueBinding(testInputArgs);
    // Assert
    expect(httpServerStoppedMessageQueueBinding).not.toBeNull();
  });
});
