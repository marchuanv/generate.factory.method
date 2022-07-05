const { createWebSocketMessageQueue } = require('C:\\component\\lib\\websocket\\websockMessageQueue.factory.js');
const { createWebSocketConnection } = require('C:\\component\\lib\\websocket\\websocketconnection.factory.js');
describe('when asking WebSocketConnection to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const websocketMessageQueue = createWebSocketMessageQueue({});
const hostAddress = 'undefined';

const timeout = 'undefined';

    // Act
    const instance = createWebSocketConnection({ websocketMessageQueue,hostAddress,timeout });
    // Assert
    expect(instance).not.toBeNull();
  });
});
