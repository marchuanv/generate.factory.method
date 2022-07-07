const { createMessageBus } = require('C:\\component\\lib\\factory\\messagebus.factory.js');
describe('when asking MessageBus to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\messagebus.factory.spec.variables.json');

    // Act
    const instance = createMessageBus({  });
    // Assert
    expect(instance).not.toBeNull();
  });
});
