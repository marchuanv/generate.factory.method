const { createServerMessageBus } = require('C:\\component\\lib\\factory\\servermessagebus.factory.js');
describe('when asking the ServerMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {contextId,senderHost,senderPort,timeout,httpServerMessageBus} = require('C:\\component\\spec\\factory\\servermessagebus.factory.spec.variables.json');

    // Act
    const {serverMessageBus} = createServerMessageBus({contextId,senderHost,senderPort,timeout});
    // Assert
    expect(serverMessageBus).not.toBeNull();
  });
});
