const { createMessageBus } = require('C:\\component\\lib\\factory\\messagebus.factory.js');
describe('when asking the MessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {timeout,hostAddress} = require('C:\\component\\spec\\factory\\messagebus.factory.spec.variables.json');

    // Act
    const instance = createMessageBus(timeout,hostAddress,timeout,hostAddress);
    // Assert
    expect(instance).not.toBeNull();
  });
});
