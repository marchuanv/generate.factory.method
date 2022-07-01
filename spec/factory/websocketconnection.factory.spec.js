const { WebSocketConnectionFactoryFactory } = require('C:\\component\\lib\\websocket\\websocketconnection.factory.js'); 

describe('when asking WebSocketConnectionFactory factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const { host,port,websocketMessageHandlerFactory,errorMessages } = [];
    // Act
    const instance = new WebSocketConnectionFactoryFactory({ host,port,websocketMessageHandlerFactory,errorMessages });
    // Assert
    expect(instance).not.toBeNull();
  });
});
