const { createWebSocketClientResponseMessageBus } = require('C:\\component\\lib\\factory\\websocketclientresponsemessagebus.factory.js');
describe('when asking the WebSocketClientResponseMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test"
}
    // Act
    const {webSocketClientResponseMessageBus} = createWebSocketClientResponseMessageBus(scopeId);
    // Assert
    expect(webSocketClientResponseMessageBus).not.toBeNull();
  });
});
