const { createMessageQueueBinder } = require('C:\\component\\lib\\factory\\messagequeuebinder.factory.js');
describe('when asking the MessageQueueBinder factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\messagequeuebinder.factory.spec.variables.json');

    // Act
    const {messageQueueBinder} = createMessageQueueBinder({scopeId});
    // Assert
    expect(messageQueueBinder).not.toBeNull();
  });
});
