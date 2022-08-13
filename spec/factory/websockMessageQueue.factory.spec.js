const { createWebSocketMessageQueue } = require('D:\\component\\lib\\factory\\websockMessageQueue.factory.js');
describe('when asking the WebSocketMessageQueue factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('D:\\component\\spec\\factory\\websockMessageQueue.factory.spec.variables.json');

    // Act
    const {websocketMessageQueue} = createWebSocketMessageQueue({});
    // Assert
    expect(websocketMessageQueue).not.toBeNull();
  });
});
