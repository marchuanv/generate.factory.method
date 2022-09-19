const { createWebSocketServerRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketserverrequestmessagequeuebinding.factory.js');
describe('when asking the WebSocketServerRequestMessageQueueBinding factory to create an instance of WebSocketServerRequestMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "scopeId": null,
    "factoryContainerBindingName": null
};

    // Act
    const {webSocketServerRequestMessageQueueBinding} = createWebSocketServerRequestMessageQueueBinding(testInputArgs);

    // Assert
    expect(webSocketServerRequestMessageQueueBinding).not.toBeNull();

  });
});
