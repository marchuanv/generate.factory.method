const { createWebSocketClientResponseMessageBus } = require('C:\\component\\lib\\factory\\websocketclientresponsemessagebus.factory.js');
describe('when asking the WebSocketClientResponseMessageBus factory to create an instance of WebSocketClientResponseMessageBus', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": null
};

    // Act
    const {webSocketClientResponseMessageBus} = createWebSocketClientResponseMessageBus(testInputArgs);

    // Assert
    expect(webSocketClientResponseMessageBus).not.toBeNull();

  });
});
