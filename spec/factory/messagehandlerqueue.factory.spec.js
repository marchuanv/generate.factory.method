const { createMessageHandlerQueue } = require('C:\\component\\lib\\factory\\messagehandlerqueue.factory.js');
describe('when asking the MessageHandlerQueue factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {messageQueueTypeCode} = require('C:\\component\\spec\\factory\\messagehandlerqueue.factory.spec.variables.json');

    // Act
    const {messageHandlerQueue} = createMessageHandlerQueue({messageQueueTypeCode});
    // Assert
    expect(messageHandlerQueue).not.toBeNull();
  });
});
