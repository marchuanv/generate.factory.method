const { createWebSocketResponseMessage } = require('C:\\component\\lib\\factory\\websocketresponsemessage.factory.js');
describe('when asking the WebSocketResponseMessage factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test",
    "messageStatusCode": null,
    "Id": null,
    "data": null,
    "recipientHost": null,
    "recipientPort": null,
    "metadata": null,
    "token": null,
    "senderHost": null,
    "senderPort": null
}

    // Act
    const {webSocketResponseMessage} = createWebSocketResponseMessage(testInputArgs);
    // Assert
    expect(webSocketResponseMessage).not.toBeNull();
  });
});
