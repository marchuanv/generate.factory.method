const { createWebSocketServerResponseMessageBus } = require('C:\\component\\lib\\factory\\websocketserverresponsemessagebus.factory.js');
describe('when asking the WebSocketServerResponseMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "Test"
}

    // Act
    const {webSocketServerResponseMessageBus} = createWebSocketServerResponseMessageBus(testInputArgs);
    // Assert
    expect(webSocketServerResponseMessageBus).not.toBeNull();
  });
});
