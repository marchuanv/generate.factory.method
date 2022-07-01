const { MessageBusFactory } = require('C:\\component\\lib\\messagebus.factory.js');
[factoryVariableNames]
const messageHandlerFactory = new MessageHandlerFactory([refArgsVariableNames]);
const { MessageHandlerFactory } = require('C:\\component\\lib\\messagehandler.factory.js');
describe('when asking MessageBus to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
const messageHandlerFactory = new MessageHandlerFactory([refArgsVariableNames]);
    const messageHandler = messageHandlerFactory.create([nonRefArgsVariableNames]);
    
    // Act
    const instance = new MessageBusFactory({ messageHandler });
    // Assert
    expect(instance).not.toBeNull();
  });
});
