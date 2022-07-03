const { MessageHandlerFactory } = require('D:\\component\\lib\\messagehandler.factory.js');
const { HttpMessageHandlerFactory } = require('D:\\component\\lib\\http\\httpmessagehandler.factory.js');
[factoryVariableNames]
const httpMessageHandlerFactory = new undefinedFactory([refArgsVariableNames]);
const webSocketMessageHandlerFactory = new undefinedFactory([refArgsVariableNames]);
describe('when asking MessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
const httpMessageHandlerFactory = new undefinedFactory([refArgsVariableNames]);
const webSocketMessageHandlerFactory = new undefinedFactory([refArgsVariableNames]);
    
    const httpMessageHandler = null;
const webSocketMessageHandler = null;
    // Act
    const instance = new MessageHandlerFactory({ httpMessageHandler,webSocketMessageHandler });
    // Assert
    expect(instance).not.toBeNull();
  });
});
