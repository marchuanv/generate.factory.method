const { createWebSocketClientRequestMessageBus } = require('C:\\component\\lib\\factory\\websocketclientrequestmessagebus.factory.js');
describe('when asking the WebSocketClientRequestMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId} = require('C:\\component\\spec\\factory\\websocketclientrequestmessagebus.factory.spec.variables.json');

    // Act
    const {webSocketClientRequestMessagebus} = createWebSocketClientRequestMessageBus({scopeId});
    // Assert
    expect(webSocketClientRequestMessagebus).not.toBeNull();
  });
});
