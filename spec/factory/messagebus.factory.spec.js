const { createMessageBus } = require('C:\\component\\lib\\factory\\messagebus.factory.js');
describe('when asking the MessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {channel,recipientHost,recipientPort,senderHost,senderPort,token,contextId,sharedMessageQueue,sharedUserSessions} = require('C:\\component\\spec\\factory\\messagebus.factory.spec.variables.json');

    // Act
    const {messageBus} = createMessageBus({recipientHost,recipientPort,contextId,channel,token,senderHost,senderPort});
    // Assert
    expect(messageBus).not.toBeNull();
  });
});
