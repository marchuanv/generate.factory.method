const { MessageBusFactory } = require('C:\\component\\lib\\messagebus.factory.js'); 

describe('when asking MessageBus to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const {} = [];
    const {messageHandler} = [MessageHandler];
    // Act
    const instance = new MessageBusFactory({ messageHandler });
    // Assert
    expect(instance).not.toBeNull();
  });
});
