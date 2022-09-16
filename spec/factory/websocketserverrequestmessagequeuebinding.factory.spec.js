const { createWebSocketServerRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketserverrequestmessagequeuebinding.factory.js');
describe('when asking the WebSocketServerRequestMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test"
}

    // Act
    const {webSocketServerRequestMessageQueueBinding} = createWebSocketServerRequestMessageQueueBinding(testInputArgs);
    // Assert
    expect(webSocketServerRequestMessageQueueBinding).not.toBeNull();
  });
});
