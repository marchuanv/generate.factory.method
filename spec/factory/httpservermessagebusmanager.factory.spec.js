const { createHttpServerMessageBusManager } = require('C:\\component\\lib\\factory\\httpservermessagebusmanager.factory.js');
describe('when asking the HttpServerMessageBusManager factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "Test"
}

    // Act
    const {httpServerMessageBusManager} = createHttpServerMessageBusManager(testInputArgs);
    // Assert
    expect(httpServerMessageBusManager).not.toBeNull();
  });
});
