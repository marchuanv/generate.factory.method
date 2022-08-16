const { createHttpServerMessageBus } = require('C:\\component\\lib\\factory\\httpservermessagebus.factory.js');
describe('when asking the HttpServerMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {contextId,senderHost,senderPort,timeout} = require('C:\\component\\spec\\factory\\httpservermessagebus.factory.spec.variables.json');

    // Act
    const {httpServerMessageBus} = createHttpServerMessageBus({contextId,senderHost,senderPort,timeout});
    // Assert
    expect(httpServerMessageBus).not.toBeNull();
  });
});
