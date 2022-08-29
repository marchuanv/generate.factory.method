const { createMessageQueueBinding } = require('C:\\component\\lib\\factory\\messagequeuebinding.factory.js');
describe('when asking the MessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\messagequeuebinding.factory.spec.variables.json');

    // Act
    const {messageQueueBinding} = createMessageQueueBinding({scopeId});
    // Assert
    expect(messageQueueBinding).not.toBeNull();
  });
});
