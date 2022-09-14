const { createWebSocketServerResponseMessageBus } = require('C:\\component\\lib\\factory\\websocketserverresponsemessagebus.factory.js');
describe('when asking the WebSocketServerResponseMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test"
}
    // Act
    const {webSocketServerResponseMessageBus} = createWebSocketServerResponseMessageBus(scopeId);
    // Assert
    expect(webSocketServerResponseMessageBus).not.toBeNull();
  });
});
