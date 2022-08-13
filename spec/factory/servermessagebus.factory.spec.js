const { createServerMessageBus } = require('D:\\component\\lib\\factory\\servermessagebus.factory.js');
describe('when asking the ServerMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {contextId,senderHost,senderPort,timeout,httpServerMessageBus,eventLogger,sharedLogging} = require('D:\\component\\spec\\factory\\servermessagebus.factory.spec.variables.json');

    // Act
    const {serverMessageBus} = createServerMessageBus({contextId,sharedLogging,senderHost,senderPort,timeout});
    // Assert
    expect(serverMessageBus).not.toBeNull();
  });
});
