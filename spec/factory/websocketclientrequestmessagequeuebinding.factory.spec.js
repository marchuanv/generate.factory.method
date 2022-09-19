const { createWebSocketClientRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketclientrequestmessagequeuebinding.factory.js');
describe('when asking the WebSocketClientRequestMessageQueueBinding factory to create an instance of WebSocketClientRequestMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": null,
    "scopeId": null
};

    // Act
    const {websocketClientRequestMessageQueueBinding} = createWebSocketClientRequestMessageQueueBinding(testInputArgs);

    // Assert
    expect(websocketClientRequestMessageQueueBinding).not.toBeNull();

  });
});
