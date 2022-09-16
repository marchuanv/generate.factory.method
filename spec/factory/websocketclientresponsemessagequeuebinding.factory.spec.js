const { createWebSocketClientResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketclientresponsemessagequeuebinding.factory.js');
describe('when asking the WebSocketClientResponseMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test"
}

    // Act
    const {websocketClientResponseMessageQueueBinding} = createWebSocketClientResponseMessageQueueBinding(testInputArgs);
    // Assert
    expect(websocketClientResponseMessageQueueBinding).not.toBeNull();
  });
});
