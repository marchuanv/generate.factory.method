const { createWebSocketMessageQueue } = require('C:\\component\\lib\\websocket\\websockMessageQueue.factory.js');
const { createWebSocketConnection } = require('C:\\component\\lib\\websocket\\websocketconnection.factory.js');
const { createWebSocketMessageHandler } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.factory.js');
describe('when asking WebSocketMessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const websocketMessageQueue = createWebSocketMessageQueue({});
const websocketConnection = createWebSocketConnection({websocketMessageQueue,hostAddress,timeout});
    // Act
    const instance = createWebSocketMessageHandler({ websocketConnection,websocketMessageQueue });
    // Assert
    expect(instance).not.toBeNull();
  });
});
