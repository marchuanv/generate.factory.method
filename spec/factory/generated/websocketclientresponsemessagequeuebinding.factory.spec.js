const { createWebSocketClientResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\generated\\websocketclientresponsemessagequeuebinding\\websocketclientresponsemessagequeuebinding.factory.js');
describe('when asking the WebSocketClientResponseMessageQueueBinding factory to create an instance of WebSocketClientResponseMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {websocketClientResponseMessageQueueBinding} = createWebSocketClientResponseMessageQueueBinding(testInputArgs);

    // Assert
    expect(websocketClientResponseMessageQueueBinding).not.toBeNull();

  });
});
