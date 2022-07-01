const { WebSocketMessageHandlerFactory } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.factory.js'); 

describe('when asking WebSocketMessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const {} = [];
    const {websocketconnection} = [WebSocketConnection];
    // Act
    const instance = new WebSocketMessageHandlerFactory({ websocketConnection,websocketMessageQueue });
    // Assert
    expect(instance).not.toBeNull();
  });
});
