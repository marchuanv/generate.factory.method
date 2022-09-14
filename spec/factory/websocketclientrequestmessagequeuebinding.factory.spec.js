const { createWebSocketClientRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketclientrequestmessagequeuebinding.factory.js');
describe('when asking the WebSocketClientRequestMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test"
}
    // Act
    const {websocketClientRequestMessageQueueBinding} = createWebSocketClientRequestMessageQueueBinding(scopeId);
    // Assert
    expect(websocketClientRequestMessageQueueBinding).not.toBeNull();
  });
});
