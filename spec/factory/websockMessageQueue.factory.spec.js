const { WebsockMessageQueueFactory } = require('C:\\component\\lib\\websocket\\websockMessageQueue.factory.js'); 

describe('when asking WebsockMessageQueue to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const {} = [];
    const {} = [];
    // Act
    const instance = new WebsockMessageQueueFactory({  });
    // Assert
    expect(instance).not.toBeNull();
  });
});