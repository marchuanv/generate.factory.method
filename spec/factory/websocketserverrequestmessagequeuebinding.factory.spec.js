const { createWebSocketServerRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketserverrequestmessagequeuebinding.factory.js');
describe('when asking the WebSocketServerRequestMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId} = require('C:\\component\\spec\\factory\\websocketserverrequestmessagequeuebinding.factory.spec.variables.json');

    // Act
    const {webSocketServerRequestMessageQueueBinding} = createWebSocketServerRequestMessageQueueBinding({scopeId});
    // Assert
    expect(webSocketServerRequestMessageQueueBinding).not.toBeNull();
  });
});