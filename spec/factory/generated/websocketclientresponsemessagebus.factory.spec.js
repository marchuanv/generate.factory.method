const { createWebSocketClientResponseMessageBus } = require('C:\\component\\lib\\factory\\generated\\websocketclientresponsemessagebus\\websocketclientresponsemessagebus.factory.js');
describe('when asking the WebSocketClientResponseMessageBus factory to create an instance of WebSocketClientResponseMessageBus', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {webSocketClientResponseMessageBus} = createWebSocketClientResponseMessageBus(testInputArgs);

    // Assert
    expect(webSocketClientResponseMessageBus).not.toBeNull();

  });
});
