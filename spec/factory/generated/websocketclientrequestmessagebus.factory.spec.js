const { createWebSocketClientRequestMessageBus } = require('C:\\component\\lib\\factory\\generated\\websocketclientrequestmessagebus\\websocketclientrequestmessagebus.factory.js');
describe('when asking the WebSocketClientRequestMessageBus factory to create an instance of WebSocketClientRequestMessageBus', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {webSocketClientRequestMessageBus} = createWebSocketClientRequestMessageBus(testInputArgs);

    // Assert
    expect(webSocketClientRequestMessageBus).not.toBeNull();

  });
});
