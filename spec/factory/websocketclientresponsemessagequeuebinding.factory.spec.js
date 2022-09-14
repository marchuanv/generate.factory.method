const { createWebSocketClientResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketclientresponsemessagequeuebinding.factory.js');
describe('when asking the WebSocketClientResponseMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test"
}
    // Act
    const {websocketClientResponseMessageQueueBinding} = createWebSocketClientResponseMessageQueueBinding(scopeId);
    // Assert
    expect(websocketClientResponseMessageQueueBinding).not.toBeNull();
  });
});
