const { MessageHandlerFactoryFactory } = require('C:\\component\\lib\\messagehandler.factory.js'); 

describe('when asking MessageHandlerFactory factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const { httpMessageHandler,webSocketMessageHandler,httpMessageFactory,webSocketMessageFactory } = [];
    // Act
    const instance = new MessageHandlerFactoryFactory({ httpMessageHandler,webSocketMessageHandler,httpMessageFactory,webSocketMessageFactory });
    // Assert
    expect(instance).not.toBeNull();
  });
});
