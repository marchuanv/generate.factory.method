const { createWebSocketMessageHandler } = require('C:\\component\\lib\\factory\\websocketmessagehandler.factory.js');
describe('when asking the WebSocketMessageHandler factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId} = require('C:\\component\\spec\\factory\\websocketmessagehandler.factory.spec.variables.json');

    // Act
    const {webSocketMessageHandler} = createWebSocketMessageHandler({scopeId});
    // Assert
    expect(webSocketMessageHandler).not.toBeNull();
  });
});
