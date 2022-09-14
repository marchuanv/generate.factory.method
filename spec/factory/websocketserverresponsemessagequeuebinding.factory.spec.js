const { createWebSocketServerResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketserverresponsemessagequeuebinding.factory.js');
describe('when asking the WebSocketServerResponseMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId} = require('C:\\component\\spec\\factory\\websocketserverresponsemessagequeuebinding.factory.spec.variables.json');

    // Act
    const {webSocketServerResponseMessageQueueBinding} = createWebSocketServerResponseMessageQueueBinding({scopeId});
    // Assert
    expect(webSocketServerResponseMessageQueueBinding).not.toBeNull();
  });
});
