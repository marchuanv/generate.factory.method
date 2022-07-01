const { MessageHandlerFactory } = require('C:\\component\\lib\\messagehandler.factory.js'); 

describe('when asking MessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const { httpMessageHandler,webSocketMessageHandler,httpMessageFactory,webSocketMessageFactory } = [];
    // Act
    const instance = new MessageHandlerFactory({ httpMessageHandler,webSocketMessageHandler,httpMessageFactory,webSocketMessageFactory });
    // Assert
    expect(instance).not.toBeNull();
  });
});
