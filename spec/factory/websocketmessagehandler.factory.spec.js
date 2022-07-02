const { WebSocketMessageHandlerFactory } = require('D:\\component\\lib\\websocket\\websocketmessagehandler.factory.js');
[factoryVariableNames]


describe('when asking WebSocketMessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]

    
    const websocketConnection = null;
const websocketMessageQueue = null;
    // Act
    const instance = new WebSocketMessageHandlerFactory({ websocketConnection,websocketMessageQueue });
    // Assert
    expect(instance).not.toBeNull();
  });
});
