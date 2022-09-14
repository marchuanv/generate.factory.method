const { createWebSocketClientRequestMessageBus } = require('C:\\component\\lib\\factory\\websocketclientrequestmessagebus.factory.js');
describe('when asking the WebSocketClientRequestMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test"
}
    // Act
    const {webSocketClientRequestMessageBus} = createWebSocketClientRequestMessageBus(scopeId);
    // Assert
    expect(webSocketClientRequestMessageBus).not.toBeNull();
  });
});
