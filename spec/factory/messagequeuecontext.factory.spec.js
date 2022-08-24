const { createMessageQueueContext } = require('C:\\component\\lib\\factory\\messagequeuecontext.factory.js');
describe('when asking the MessageQueueContext factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\messagequeuecontext.factory.spec.variables.json');

    // Act
    const {messageQueueContext} = createMessageQueueContext({scopeId});
    // Assert
    expect(messageQueueContext).not.toBeNull();
  });
});
