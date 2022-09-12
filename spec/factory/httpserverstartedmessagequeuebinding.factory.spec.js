const { createHttpServerStartedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstartedmessagequeuebinding.factory.js');
describe('when asking the HttpServerStartedMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId,messageQueue} = require('C:\\component\\spec\\factory\\httpserverstartedmessagequeuebinding.factory.spec.variables.json');

    // Act
    const {httpServerStartedMessageQueueBinding} = createHttpServerStartedMessageQueueBinding({scopeId});
    // Assert
    expect(httpServerStartedMessageQueueBinding).not.toBeNull();
  });
});
