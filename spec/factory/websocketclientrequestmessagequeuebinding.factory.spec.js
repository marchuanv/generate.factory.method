const { createWebSocketClientRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketclientrequestmessagequeuebinding.factory.js');
describe('when asking the WebSocketClientRequestMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId} = require('C:\\component\\spec\\factory\\websocketclientrequestmessagequeuebinding.factory.spec.variables.json');

    // Act
    const {websocketClientRequestMessageQueueBinding} = createWebSocketClientRequestMessageQueueBinding({scopeId});
    // Assert
    expect(websocketClientRequestMessageQueueBinding).not.toBeNull();
  });
});
