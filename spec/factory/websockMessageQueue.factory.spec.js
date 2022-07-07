const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
describe('when asking the WebSocketMessageQueue factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\websockMessageQueue.factory.spec.variables.json');

    // Act
    const instance = createWebSocketMessageQueue({  });
    // Assert
    expect(instance).not.toBeNull();
  });
});
