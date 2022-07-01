const { WebSocketMessageHandlerFactory } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.factory.js'); 

describe('when asking WebSocketMessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const { messageFactory,errorMessages,connection } = [];
    // Act
    const instance = new WebSocketMessageHandlerFactory({ messageFactory,errorMessages,connection });
    // Assert
    expect(instance).not.toBeNull();
  });
});
