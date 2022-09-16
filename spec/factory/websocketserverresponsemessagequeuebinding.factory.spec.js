const { createWebSocketServerResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketserverresponsemessagequeuebinding.factory.js');
describe('when asking the WebSocketServerResponseMessageQueueBinding factory to create an instance of WebSocketServerResponseMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test"
};

    // Act
    const {webSocketServerResponseMessageQueueBinding} = createWebSocketServerResponseMessageQueueBinding(testInputArgs);

    // Assert
    expect(webSocketServerResponseMessageQueueBinding).not.toBeNull();

  });
});
