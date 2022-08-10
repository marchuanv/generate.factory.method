const { createWebSocketConnection } = require('D:\\component\\lib\\factory\\websocketconnection.factory.js');
describe('when asking the WebSocketConnection factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {timeout,host,port,hostPort,hostAddress} = require('D:\\component\\spec\\factory\\websocketconnection.factory.spec.variables.json');

    // Act
    const {webSocketConnection} = createWebSocketConnection({timeout,hostAddress});
    // Assert
    expect(webSocketConnection).not.toBeNull();
  });
});
