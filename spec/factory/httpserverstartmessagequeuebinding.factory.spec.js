const { createHttpServerStartMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstartmessagequeuebinding.factory.js');
describe('when asking the HttpServerStartMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId,messageQueue} = require('C:\\component\\spec\\factory\\httpserverstartmessagequeuebinding.factory.spec.variables.json');

    // Act
    const {httpServerStartMessageQueueBinding} = createHttpServerStartMessageQueueBinding({scopeId});
    // Assert
    expect(httpServerStartMessageQueueBinding).not.toBeNull();
  });
});
