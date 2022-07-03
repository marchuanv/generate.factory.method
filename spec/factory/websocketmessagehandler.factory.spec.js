const { WebSocketMessageHandlerFactory } = require('D:\\component\\lib\\websocket\\websocketmessagehandler.factory.js');
const { WebSocketConnectionFactory } = require('D:\\component\\lib\\websocket\\websocketconnection.factory.js');
[factoryVariableNames]
const websocketConnectionFactory = new undefinedFactory([refArgsVariableNames]);
const websocketMessageQueueFactory = new undefinedFactory([refArgsVariableNames]);
describe('when asking WebSocketMessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
const websocketConnectionFactory = new undefinedFactory([refArgsVariableNames]);
const websocketMessageQueueFactory = new undefinedFactory([refArgsVariableNames]);
    
    const websocketConnection = null;
const websocketMessageQueue = null;
    // Act
    const instance = new WebSocketMessageHandlerFactory({ websocketConnection,websocketMessageQueue });
    // Assert
    expect(instance).not.toBeNull();
  });
});
