const { createWebSocketConnection } = require('C:\component\lib\websocket\websocketconnection.factory.js');
describe('when asking WebSocketConnection to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    
    // Act
    const instance = createWebSocketConnection({ host,port });
    // Assert
    expect(instance).not.toBeNull();
  });
});
