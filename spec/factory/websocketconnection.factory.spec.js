const { WebSocketConnectionFactory } = require('C:\\component\\lib\\websocket\\websocketconnection.factory.js'); 

describe('when asking WebSocketConnection to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const {host,port} = [];
    const {} = [];
    // Act
    const instance = new WebSocketConnectionFactory({ host,port });
    // Assert
    expect(instance).not.toBeNull();
  });
});
