const { MessageHandlerFactory } = require('C:\\component\\lib\\messagehandler.factory.js'); 
describe('when asking MessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const httpMessageHandler = new HttpMessageHandler();
const webSocketMessageHandler = new WebSocketMessageHandler();
    const {} = [];
    // Act
    const instance = new MessageHandlerFactory({ httpMessageHandler,webSocketMessageHandler });
    // Assert
    expect(instance).not.toBeNull();
  });
});
