const { MessageHandlerFactory } = require('C:\\component\\lib\\messagehandler.factory.js');
const { HttpMessageHandlerFactory } = require('C:\\component\\lib\\http\\httpmessagehandler.factory.js');
const { WebSocketMessageHandlerFactory } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.factory.js');
[factoryVariableNames]
describe('when asking MessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
    [refArgsVariableNames]
    [nonRefArgsVariableNames]
    // Act
    const instance = new MessageHandlerFactory({ httpMessageHandler,webSocketMessageHandler });
    // Assert
    expect(instance).not.toBeNull();
  });
});
