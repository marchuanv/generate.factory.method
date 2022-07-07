const { createWebSocketConnection } = require('C:\\component\\lib\\factory\\websocketconnection.factory.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { createWebSocketMessageHandler } = require('C:\\component\\lib\\factory\\websocketmessagehandler.factory.js');
describe('when asking the WebSocketMessageHandler factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {timeout,hostAddress} = require('C:\\component\\spec\\factory\\websocketmessagehandler.factory.spec.variables.json');

const websocketMessageQueue = createWebSocketMessageQueue({});
const websocketConnection = createWebSocketConnection({timeout,websocketMessageQueue,hostAddress});
    // Act
    const instance = createWebSocketMessageHandler({ websocketConnection,websocketMessageQueue });
    // Assert
    expect(instance).not.toBeNull();
  });
});
