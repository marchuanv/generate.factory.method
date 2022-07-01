const { MessageHandlerFactory } = require('C:\\component\\lib\\messagehandler.factory.js');
[factoryVariableNames]
const httpMessageHandlerFactory = new HttpMessageHandlerFactory([refArgsVariableNames]);
const webSocketMessageHandlerFactory = new WebSocketMessageHandlerFactory([refArgsVariableNames]);
const { HttpMessageHandlerFactory } = require('C:\\component\\lib\\http\\httpmessagehandler.factory.js');
const { WebSocketMessageHandlerFactory } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.factory.js');
describe('when asking MessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
const httpMessageHandlerFactory = new HttpMessageHandlerFactory([refArgsVariableNames]);
const webSocketMessageHandlerFactory = new WebSocketMessageHandlerFactory([refArgsVariableNames]);
    const httpMessageHandler = httpMessageHandlerFactory.create([nonRefArgsVariableNames]);
const webSocketMessageHandler = webSocketMessageHandlerFactory.create([nonRefArgsVariableNames]);
    
    // Act
    const instance = new MessageHandlerFactory({ httpMessageHandler,webSocketMessageHandler });
    // Assert
    expect(instance).not.toBeNull();
  });
});
