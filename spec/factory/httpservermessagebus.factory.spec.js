const { createHttpServerMessageBus } = require('C:\\component\\lib\\factory\\httpservermessagebus.factory.js');
describe('when asking the HttpServerMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test",
    "timeout": null,
    "senderHost": null,
    "senderPort": null
}
    // Act
    const {httpServerMessageBus} = createHttpServerMessageBus(scopeId,timeout,senderHost,senderPort);
    // Assert
    expect(httpServerMessageBus).not.toBeNull();
  });
});
