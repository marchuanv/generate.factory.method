const { createWebSocketMessageHandler } = require('C:\\component\\lib\\factory\\websocketmessagehandler.factory.js');
describe('when asking the WebSocketMessageHandler factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {timeout,hostAddress} = require('C:\\component\\spec\\factory\\websocketmessagehandler.factory.spec.variables.json');

    // Act
    const instance = createWebSocketMessageHandler(timeout,hostAddress);
    // Assert
    expect(instance).not.toBeNull();
  });
});
