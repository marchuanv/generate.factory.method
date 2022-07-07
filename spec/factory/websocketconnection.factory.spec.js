const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { createWebSocketConnection } = require('C:\\component\\lib\\factory\\websocketconnection.factory.js');
describe('when asking WebSocketConnection to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const websocketMessageQueue = createWebSocketMessageQueue({});
const {timeout,hostAddress,websocketMessageQueuehostAddress} = require('C:\\component\\spec\\factory\\websocketconnection.factory.spec.variables.json');

    // Act
    const instance = createWebSocketConnection({ timeout,websocketMessageQueue,hostAddress });
    // Assert
    expect(instance).not.toBeNull();
  });
});
