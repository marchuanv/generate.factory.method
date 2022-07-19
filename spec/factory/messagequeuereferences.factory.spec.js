const { createMessageQueueReferences } = require('C:\\component\\lib\\factory\\messagequeuereferences.factory.js');
describe('when asking the MessageQueueReferences factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\messagequeuereferences.factory.spec.variables.json');

    // Act
    const {messageQueueReferences} = createMessageQueueReferences({});
    // Assert
    expect(messageQueueReferences).not.toBeNull();
  });
});
