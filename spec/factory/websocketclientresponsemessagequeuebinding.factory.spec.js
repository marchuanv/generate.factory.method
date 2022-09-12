const { createWebSocketClientResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketclientresponsemessagequeuebinding.factory.js');
describe('when asking the WebSocketClientResponseMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId} = require('C:\\component\\spec\\factory\\websocketclientresponsemessagequeuebinding.factory.spec.variables.json');

    // Act
    const {websocketClientResponseMessageQueueBinding} = createWebSocketClientResponseMessageQueueBinding({scopeId});
    // Assert
    expect(websocketClientResponseMessageQueueBinding).not.toBeNull();
  });
});