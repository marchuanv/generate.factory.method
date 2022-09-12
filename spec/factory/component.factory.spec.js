const { createComponent } = require('C:\\component\\lib\\factory\\component.factory.js');
describe('when asking the Component factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId,packageJson,webSocketServerRequestMessageBus,webSocketServerResponseMessageBus} = require('C:\\component\\spec\\factory\\component.factory.spec.variables.json');

    // Act
    const {component} = createComponent({scopeId,packageJson,webSocketServerRequestMessageBus,webSocketServerResponseMessageBus});
    // Assert
    expect(component).not.toBeNull();
  });
});
