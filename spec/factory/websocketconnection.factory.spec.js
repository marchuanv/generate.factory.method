const { createWebSocketMessageQueue } = require('C:\\component\\lib\\websocket\\websockMessageQueue.factory.js');
const { createWebSocketConnection } = require('C:\\component\\lib\\websocket\\websocketconnection.factory.js');
describe('when asking WebSocketConnection to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const websocketMessageQueue = createWebSocketMessageQueue({});
const hostAddress = {
    "host": "localhost",
    "port": 3000
};

const timeout = 5000;

    // Act
    const instance = createWebSocketConnection({ websocketMessageQueue,hostAddress,timeout });
    // Assert
    expect(instance).not.toBeNull();
  });
});
