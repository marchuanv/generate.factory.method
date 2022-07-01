const { MessageBusFactoryFactory } = require('C:\\component\\lib\\messagebus.factory.js'); 

describe('when asking MessageBusFactory factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const { messageHandler,subscriptionFactory } = [];
    // Act
    const instance = new MessageBusFactoryFactory({ messageHandler,subscriptionFactory });
    // Assert
    expect(instance).not.toBeNull();
  });
});
