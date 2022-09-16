const { createHttpServerMessageBus } = require('C:\\component\\lib\\factory\\httpservermessagebus.factory.js');
describe('when asking the HttpServerMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test",
    "timeout": null,
    "senderHost": null,
    "senderPort": null
}

    // Act
    const {httpServerMessageBus} = createHttpServerMessageBus(testInputArgs);
    // Assert
    expect(httpServerMessageBus).not.toBeNull();
  });
});
