const { createWebSocketConnection } = require('C:\\component\\lib\\factory\\websocketconnection.factory.js');
describe('when asking the WebSocketConnection factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {timeout,host,port} = require('C:\\component\\spec\\factory\\websocketconnection.factory.spec.variables.json');

    // Act
    const {webSocketConnection} = createWebSocketConnection({timeout,host,port});
    // Assert
    expect(webSocketConnection).not.toBeNull();
  });
});
