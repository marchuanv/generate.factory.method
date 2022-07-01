const { WebSocketMessageHandlerFactory } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.factory.js');
const { WebSocketConnectionFactory } = require('C:\\component\\lib\\websocket\\websocketconnection.factory.js');
describe('when asking WebSocketMessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const websocketConnectionFactory = new WebSocketConnectionFactory();
    const websocketConnection = websocketConnectionFactory.create();
    const websocketMessageQueue = null;
    // Act
    const instance = new WebSocketMessageHandlerFactory({ websocketConnection,websocketMessageQueue });
    // Assert
    expect(instance).not.toBeNull();
  });
});
