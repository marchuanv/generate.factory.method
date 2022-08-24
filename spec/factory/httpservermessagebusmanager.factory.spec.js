const { createHttpServerMessageBusManager } = require('C:\\component\\lib\\factory\\httpservermessagebusmanager.factory.js');
describe('when asking the HttpServerMessageBusManager factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\httpservermessagebusmanager.factory.spec.variables.json');

    // Act
    const {httpServerMessageBusManager} = createHttpServerMessageBusManager({scopeId});
    // Assert
    expect(httpServerMessageBusManager).not.toBeNull();
  });
});
