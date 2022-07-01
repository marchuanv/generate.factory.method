const { WebSocketMessageHandlerFactoryFactory } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.factory.js'); 

describe('when asking WebSocketMessageHandlerFactory factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const { messageFactory,errorMessages,connection } = [];
    // Act
    const instance = new WebSocketMessageHandlerFactoryFactory({ messageFactory,errorMessages,connection });
    // Assert
    expect(instance).not.toBeNull();
  });
});
