const { createWebSocketServerResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\generated\\websocketserverresponsemessagequeuebinding\\websocketserverresponsemessagequeuebinding.factory.js');
describe('when asking the WebSocketServerResponseMessageQueueBinding factory to create an instance of WebSocketServerResponseMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {webSocketServerResponseMessageQueueBinding} = createWebSocketServerResponseMessageQueueBinding(testInputArgs);

    // Assert
    expect(webSocketServerResponseMessageQueueBinding).not.toBeNull();

  });
});
