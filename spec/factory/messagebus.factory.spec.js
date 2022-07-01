const { MessageBusFactory } = require('C:\\component\\lib\\messagebus.factory.js');
const { MessageHandlerFactory } = require('C:\\component\\lib\\messagehandler.factory.js');
describe('when asking MessageBus to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const messageHandlerFactory = new MessageHandlerFactory();
    const messageHandler = messageHandlerFactory.create();
    
    // Act
    const instance = new MessageBusFactory({ messageHandler });
    // Assert
    expect(instance).not.toBeNull();
  });
});
