const { createWebSocketServerRequestMessageBus } = require('C:\\component\\lib\\factory\\generated\\websocketserverrequestmessagebus\\websocketserverrequestmessagebus.factory.js');
describe('when asking the WebSocketServerRequestMessageBus factory to create an instance of WebSocketServerRequestMessageBus', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {webSocketServerRequestMessageBus} = createWebSocketServerRequestMessageBus(testInputArgs);

    // Assert
    expect(webSocketServerRequestMessageBus).not.toBeNull();

  });
});
