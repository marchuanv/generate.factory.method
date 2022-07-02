const { WebsockMessageQueueFactory } = require('D:\\component\\lib\\websocket\\websockMessageQueue.factory.js');
[factoryVariableNames]


describe('when asking WebsockMessageQueue to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]

    
    
    // Act
    const instance = new WebsockMessageQueueFactory({  });
    // Assert
    expect(instance).not.toBeNull();
  });
});
