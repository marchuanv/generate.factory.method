const { createWebSocketRequestMessage } = require('C:\\component\\lib\\factory\\websocketrequestmessage.factory.js');
describe('when asking the WebSocketRequestMessage factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId,data,senderHost,senderPort,metadata,recipientHost,recipientPort,messageStatusCode,Id,token,message} = require('C:\\component\\spec\\factory\\websocketrequestmessage.factory.spec.variables.json');

    // Act
    const {webSocketRequestMessage} = createWebSocketRequestMessage({scopeId,message});
    // Assert
    expect(webSocketRequestMessage).not.toBeNull();
  });
});
