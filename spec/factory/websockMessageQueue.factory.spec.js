const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
describe('when asking WebSocketMessageQueue to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    
    // Act
    const instance = createWebSocketMessageQueue({  });
    // Assert
    expect(instance).not.toBeNull();
  });
});
