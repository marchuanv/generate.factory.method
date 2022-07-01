const { WebSocketConnectionFactory } = require('C:\\component\\lib\\websocket\\websocketconnection.factory.js');
[factoryVariableNames]


describe('when asking WebSocketConnection to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]

    
    const host = null;
const port = null;
    // Act
    const instance = new WebSocketConnectionFactory({ host,port });
    // Assert
    expect(instance).not.toBeNull();
  });
});
