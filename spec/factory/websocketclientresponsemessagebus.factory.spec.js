const { createWebSocketClientResponseMessageBus } = require('C:\\component\\lib\\factory\\websocketclientresponsemessagebus.factory.js');
describe('when asking the WebSocketClientResponseMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId,messageQueue} = require('C:\\component\\spec\\factory\\websocketclientresponsemessagebus.factory.spec.variables.json');

    // Act
    const {webSocketClientResponseMessageBus} = createWebSocketClientResponseMessageBus({scopeId});
    // Assert
    expect(webSocketClientResponseMessageBus).not.toBeNull();
  });
});
