const { createHttpServerMessageBus } = require('D:\\component\\lib\\factory\\httpservermessagebus.factory.js');
describe('when asking the HttpServerMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {contextId,senderHost,senderPort,timeout} = require('D:\\component\\spec\\factory\\httpservermessagebus.factory.spec.variables.json');

    // Act
    const {httpServerMessageBus} = createHttpServerMessageBus({contextId,timeout,senderHost,senderPort});
    // Assert
    expect(httpServerMessageBus).not.toBeNull();
  });
});
