const { createMessageHandlerQueue } = require('C:\\component\\lib\\factory\\messagehandlerqueue.factory.js');
describe('when asking the MessageHandlerQueue factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {messageQueueTypeCode,sharedMessageQueue,messageQueueContextId} = require('C:\\component\\spec\\factory\\messagehandlerqueue.factory.spec.variables.json');

    // Act
    const {messageHandlerQueue} = createMessageHandlerQueue({messageQueueContextId,messageQueueTypeCode});
    // Assert
    expect(messageHandlerQueue).not.toBeNull();
  });
});
