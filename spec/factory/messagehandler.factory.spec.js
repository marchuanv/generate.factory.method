const { MessageHandlerFactory } = require('D:\\component\\lib\\messagehandler.factory.js');
[factoryVariableNames]


describe('when asking MessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]

    
    const httpMessageHandler = null;
const webSocketMessageHandler = null;
    // Act
    const instance = new MessageHandlerFactory({ httpMessageHandler,webSocketMessageHandler });
    // Assert
    expect(instance).not.toBeNull();
  });
});
