const { createMessageHandler } = require('C:\\component\\lib\\factory\\messagehandler.factory.js');
describe('when asking the MessageHandler factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {timeout,hostAddress} = require('C:\\component\\spec\\factory\\messagehandler.factory.spec.variables.json');

    // Act
    const instance = createMessageHandler(timeout,hostAddress,timeout,hostAddress);
    // Assert
    expect(instance).not.toBeNull();
  });
});
