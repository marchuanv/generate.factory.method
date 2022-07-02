const { MessageBusFactory } = require('D:\\component\\lib\\messagebus.factory.js');
[factoryVariableNames]


describe('when asking MessageBus to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]

    
    const messageHandler = null;
    // Act
    const instance = new MessageBusFactory({ messageHandler });
    // Assert
    expect(instance).not.toBeNull();
  });
});
