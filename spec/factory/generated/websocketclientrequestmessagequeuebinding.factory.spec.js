const { createWebSocketClientRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\generated\\websocketclientrequestmessagequeuebinding\\websocketclientrequestmessagequeuebinding.factory.js');
describe('when asking the WebSocketClientRequestMessageQueueBinding factory to create an instance of WebSocketClientRequestMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {websocketClientRequestMessageQueueBinding} = createWebSocketClientRequestMessageQueueBinding(testInputArgs);

    // Assert
    expect(websocketClientRequestMessageQueueBinding).not.toBeNull();

  });
});
