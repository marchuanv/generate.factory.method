const { createWebSocketServerResponseMessageBus } = require('C:\\component\\lib\\factory\\generated\\websocketserverresponsemessagebus\\websocketserverresponsemessagebus.factory.js');
describe('when asking the WebSocketServerResponseMessageBus factory to create an instance of WebSocketServerResponseMessageBus', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {webSocketServerResponseMessageBus} = createWebSocketServerResponseMessageBus(testInputArgs);

    // Assert
    expect(webSocketServerResponseMessageBus).not.toBeNull();

  });
});
