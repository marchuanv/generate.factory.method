const { createWebSocketRequestMessage } = require('C:\\component\\lib\\factory\\generated\\websocketrequestmessage\\websocketrequestmessage.factory.js');
describe('when asking the WebSocketRequestMessage factory to create an instance of WebSocketRequestMessage', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "messageStatusCode": null,
    "factoryContainerBindingName": "factoryspec",
    "Id": null,
    "data": null,
    "recipientHost": null,
    "recipientPort": null,
    "metadata": null,
    "token": null,
    "senderHost": null,
    "senderPort": null
};

    // Act
    const {webSocketRequestMessage} = createWebSocketRequestMessage(testInputArgs);

    // Assert
    expect(webSocketRequestMessage).not.toBeNull();

  });
});
