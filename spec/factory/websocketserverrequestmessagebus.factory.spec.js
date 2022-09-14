const { createWebSocketServerRequestMessageBus } = require('C:\\component\\lib\\factory\\websocketserverrequestmessagebus.factory.js');
describe('when asking the WebSocketServerRequestMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId} = require('C:\\component\\spec\\factory\\websocketserverrequestmessagebus.factory.spec.variables.json');

    // Act
    const {webSocketServerRequestMessageBus} = createWebSocketServerRequestMessageBus({scopeId});
    // Assert
    expect(webSocketServerRequestMessageBus).not.toBeNull();
  });
});
