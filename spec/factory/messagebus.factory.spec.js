const { MessageBusFactory } = require('D:\\component\\lib\\messagebus.factory.js');
const { MessageHandlerFactory } = require('D:\\component\\lib\\messagehandler.factory.js');
[factoryVariableNames]
const messageHandlerFactory = new undefinedFactory([refArgsVariableNames]);
describe('when asking MessageBus to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
const messageHandlerFactory = new undefinedFactory([refArgsVariableNames]);
    
    const messageHandler = null;
    // Act
    const instance = new MessageBusFactory({ messageHandler });
    // Assert
    expect(instance).not.toBeNull();
  });
});
