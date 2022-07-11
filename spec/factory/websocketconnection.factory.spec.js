const { createWebSocketConnection } = require('C:\\component\\lib\\factory\\websocketconnection.factory.js');
describe('when asking the WebSocketConnection factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {timeout,hostAddress} = require('C:\\component\\spec\\factory\\websocketconnection.factory.spec.variables.json');

    // Act
    const {websocketConnection} = createWebSocketConnection({timeout,hostAddress});
    // Assert
    expect(websocketConnection).not.toBeNull();
  });
});
