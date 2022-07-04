const { MessageBusFactory } = require('C:\\component\\lib\\messagebus.factory.js');
const { MessageHandlerFactory } = require('C:\\component\\lib\\messagehandler.factory.js');
[factoryVariableNames]
describe('when asking MessageBus to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
    [refArgsVariableNames]
    [nonRefArgsVariableNames]
    // Act
    const instance = new MessageBusFactory({ messageHandler });
    // Assert
    expect(instance).not.toBeNull();
  });
});
